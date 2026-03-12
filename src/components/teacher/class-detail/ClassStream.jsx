import React, { useState, useEffect } from 'react';
import { Send, MoreVertical, AlertCircle, Loader2, MessageSquarePlus, Edit2, Trash2, Check } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';

// Import the components we just fixed!
import StreamCoverView from './StreamCoverView';
import ClassAppearanceModal from './ClassAppearanceModal';

const ClassStream = ({ classId }) => {
    const [streamData, setStreamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    // Modal & UI States
    const [isAppearanceModalOpen, setIsAppearanceModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const data = await teacherService.getClassStream(classId);
                setStreamData(data); // 🟢 Now includes title, color, image, etc.
            } catch (error) {
                console.error("Failed to load class stream", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (classId) fetchStream();
    }, [classId]);

    // 🟢 Handle saving the new appearance to the database
    const handleSaveAppearance = async (appearanceData) => {
        try {
            await teacherService.updateClassAppearance(classId, appearanceData);
            // Instantly update the UI without refreshing
            setStreamData(prev => ({
                ...prev,
                themeColorHex: appearanceData.themeColorHex,
                bannerImageUrl: appearanceData.bannerImageUrl
            }));
        } catch (error) {
            console.error("Failed to save appearance", error);
            throw error; // Let the modal catch it and show an error alert
        }
    };

    const handlePost = async () => {
        if (!newPostContent.trim()) return;
        setIsPosting(true);
        try {
            const newAnnouncement = await teacherService.postAnnouncement(classId, newPostContent);
            setStreamData(prev => ({
                ...prev,
                announcements: [newAnnouncement, ...prev.announcements]
            }));
            setNewPostContent('');
        } catch (error) {
            console.error("Failed to post announcement", error);
        } finally {
            setIsPosting(false);
        }
    };

    const confirmDelete = async () => {
        if (!postToDelete) return;
        setIsActionLoading(true);
        try {
            await teacherService.deleteAnnouncement(classId, postToDelete);
            setStreamData(prev => ({
                ...prev,
                announcements: prev.announcements.filter(a => a.id !== postToDelete)
            }));
            setPostToDelete(null);
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete announcement.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const startEditing = (post) => {
        setEditingId(post.id);
        setEditContent(post.content);
        setActiveMenuId(null);
    };

    const handleSaveEdit = async (announcementId) => {
        if (!editContent.trim()) return;
        setIsActionLoading(true);
        try {
            const updatedPost = await teacherService.updateAnnouncement(classId, announcementId, editContent);
            setStreamData(prev => ({
                ...prev,
                announcements: prev.announcements.map(a => a.id === announcementId ? updatedPost : a)
            }));
            setEditingId(null);
        } catch (error) {
            console.error("Failed to update", error);
            alert("Failed to update announcement.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(' ');
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-examsy-primary">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-bold tracking-widest text-sm uppercase">Loading Stream...</p>
            </div>
        );
    }

    if (!streamData) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-examsy-surface rounded-3xl border border-dashed border-zinc-800">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <p className="text-examsy-muted font-bold">Failed to load class stream data.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 relative">


             {/*🟢 THE COVER COMPONENT (Now tied to real data)*/}
            <StreamCoverView
                title={streamData.title}
                section={streamData.section}
                                        themeColorHex={streamData.themeColorHex}
                bannerImageUrl={streamData.bannerImageUrl}
                onCustomize={() => setIsAppearanceModalOpen(true)}
            />


            {/* 🟢 THE CUSTOMIZATION MODAL */}
            <ClassAppearanceModal
                isOpen={isAppearanceModalOpen}
                onClose={() => setIsAppearanceModalOpen(false)}
                currentColor={streamData.themeColorHex}
                onSave={handleSaveAppearance}
            />

            {/* Delete Modal */}
            {postToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-examsy-surface w-full max-w-sm rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-examsy-text mb-2">Delete Post?</h3>
                        <p className="text-sm font-bold text-examsy-muted mb-8">
                            This action cannot be undone. Are you sure you want to permanently remove this announcement?
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setPostToDelete(null)} disabled={isActionLoading} className="flex-1 py-3.5 rounded-xl bg-examsy-bg border border-zinc-200 dark:border-zinc-800 font-bold text-examsy-muted hover:text-examsy-text transition-colors disabled:opacity-50">Cancel</button>
                            <button onClick={confirmDelete} disabled={isActionLoading} className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:shadow-none">
                                {isActionLoading ? <Loader2 size={18} className="animate-spin" /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeMenuId && <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />}

            {/* Stream Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                <div className="lg:col-span-1">
                    <div className="bg-examsy-surface p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-4">
                        <p className="text-xs font-black uppercase tracking-wider text-examsy-muted mb-3">Class Code</p>
                        <div className="bg-examsy-bg p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
                            <span className="font-mono font-black text-examsy-primary text-2xl tracking-widest">{streamData.classCode || "N/A"}</span>
                        </div>
                        <p className="text-[10px] text-center text-examsy-muted font-bold mt-4">Share this code with students to grant access.</p>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-4 shadow-sm transition-all focus-within:border-examsy-primary focus-within:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-examsy-primary flex items-center justify-center text-white font-black text-sm shrink-0">ME</div>
                        <input value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handlePost()} placeholder="Announce something to your class..." className="bg-transparent flex-1 w-full outline-none text-examsy-text font-bold" />
                        <button onClick={handlePost} disabled={isPosting || !newPostContent.trim()} className="bg-examsy-primary text-white p-3 rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shrink-0 w-full sm:w-auto flex justify-center">
                            {isPosting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </button>
                    </div>

                    {streamData.announcements.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center bg-examsy-surface/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                            <MessageSquarePlus size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                            <h3 className="text-lg font-black text-examsy-text">Start the Conversation</h3>
                            <p className="text-sm font-bold text-examsy-muted mt-1 max-w-sm">This class stream is empty. Post a welcome message, syllabus, or announcement above!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {streamData.announcements.map((post) => (
                                <div key={post.id} className="bg-examsy-surface rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow relative z-20">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-examsy-bg flex items-center justify-center font-black text-examsy-primary">{getInitials(post.authorName)}</div>
                                            <div>
                                                <h4 className="font-black text-sm text-examsy-text">{post.authorName}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">{post.formattedDate}</p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <button onClick={() => setActiveMenuId(activeMenuId === post.id ? null : post.id)} className="text-examsy-muted hover:text-examsy-text p-2 rounded-lg hover:bg-examsy-bg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenuId === post.id && (
                                                <div className="absolute right-0 mt-2 w-36 bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100">
                                                    <button onClick={() => startEditing(post)} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-examsy-text hover:bg-examsy-surface transition-colors"><Edit2 size={14} /> Edit</button>
                                                    <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
                                                    <button onClick={() => { setPostToDelete(post.id); setActiveMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /> Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {editingId === post.id ? (
                                        <div className="mt-2 animate-in fade-in">
                                            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 text-examsy-text font-medium outline-none focus:border-examsy-primary resize-none min-h-[100px]" autoFocus />
                                            <div className="flex justify-end gap-2 mt-3">
                                                <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-xl text-sm font-bold text-examsy-muted hover:bg-examsy-bg transition-colors" disabled={isActionLoading}>Cancel</button>
                                                <button onClick={() => handleSaveEdit(post.id)} disabled={isActionLoading || !editContent.trim()} className="px-4 py-2 bg-examsy-primary text-white rounded-xl text-sm font-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2">
                                                    {isActionLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-examsy-text font-medium leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassStream;
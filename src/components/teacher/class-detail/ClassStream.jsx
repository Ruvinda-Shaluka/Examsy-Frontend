import React, { useState, useEffect } from 'react';
import { Send, MoreVertical, AlertCircle, Loader2, MessageSquarePlus } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';

const ClassStream = ({ classId }) => {
    const [streamData, setStreamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    // Fetch Stream Data
    useEffect(() => {
        const fetchStream = async () => {
            try {
                const data = await teacherService.getClassStream(classId);
                setStreamData(data);
            } catch (error) {
                console.error("Failed to load class stream", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (classId) fetchStream();
    }, [classId]);

    // Handle Posting Announcement
    const handlePost = async () => {
        if (!newPostContent.trim()) return;
        setIsPosting(true);
        try {
            const newAnnouncement = await teacherService.postAnnouncement(classId, newPostContent);
            // Prepend the new post instantly to the UI
            setStreamData(prev => ({
                ...prev,
                announcements: [newAnnouncement, ...prev.announcements]
            }));
            setNewPostContent(''); // Clear input
        } catch (error) {
            console.error("Failed to post announcement", error);
        } finally {
            setIsPosting(false);
        }
    };

    // Helper to get initials (e.g., "John Smith" -> "JS")
    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(' ');
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    // LOADING STATE
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-examsy-primary">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-bold tracking-widest text-sm uppercase">Loading Stream...</p>
            </div>
        );
    }

    // ERROR STATE (If class isn't found)
    if (!streamData) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-examsy-surface rounded-3xl border border-dashed border-zinc-800">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <p className="text-examsy-muted font-bold">Failed to load class stream data.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4">

            {/* Sidebar: Class Code */}
            <div className="lg:col-span-1">
                <div className="bg-examsy-surface p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-4">
                    <p className="text-xs font-black uppercase tracking-wider text-examsy-muted mb-3">Class Code</p>
                    <div className="bg-examsy-bg p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
                        <span className="font-mono font-black text-examsy-primary text-2xl tracking-widest">{streamData.classCode || "N/A"}</span>
                    </div>
                    <p className="text-[10px] text-center text-examsy-muted font-bold mt-4">Share this code with students to grant access.</p>
                </div>
            </div>

            {/* Main Stream Area */}
            <div className="lg:col-span-3 space-y-6">

                {/* 🟢 Post Input Area */}
                <div className="bg-examsy-surface p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-4 shadow-sm transition-all focus-within:border-examsy-primary focus-within:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-examsy-primary flex items-center justify-center text-white font-black text-sm shrink-0">
                        ME
                    </div>
                    <input
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                        placeholder="Announce something to your class..."
                        className="bg-transparent flex-1 w-full outline-none text-examsy-text font-bold"
                    />
                    <button
                        onClick={handlePost}
                        disabled={isPosting || !newPostContent.trim()}
                        className="bg-examsy-primary text-white p-3 rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shrink-0 w-full sm:w-auto flex justify-center"
                    >
                        {isPosting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>

                {/* 🟢 Announcements Feed or Empty State */}
                {streamData.announcements.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center bg-examsy-surface/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                        <MessageSquarePlus size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                        <h3 className="text-lg font-black text-examsy-text">Start the Conversation</h3>
                        <p className="text-sm font-bold text-examsy-muted mt-1 max-w-sm">This class stream is empty. Post a welcome message, syllabus, or announcement above!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {streamData.announcements.map((post) => (
                            <div key={post.id} className="bg-examsy-surface rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-examsy-bg flex items-center justify-center font-black text-examsy-primary">
                                            {getInitials(post.authorName)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm text-examsy-text">{post.authorName}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">{post.formattedDate}</p>
                                        </div>
                                    </div>
                                    <button className="text-examsy-muted hover:text-examsy-text p-2 rounded-lg hover:bg-examsy-bg transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                                <p className="text-examsy-text font-medium leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassStream;
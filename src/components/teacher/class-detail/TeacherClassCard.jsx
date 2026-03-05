import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, TrendingUp, FolderOpen, Link as LinkIcon, Trash2 } from 'lucide-react';
import CustomAlert from '../../common/CustomAlert';
import ConfirmActionModal from '../../common/ConfirmActionModal';

const TeacherClassCard = ({ id, title, section, bannerColor, onDelete }) => {
    const navigate = useNavigate();

    // UI States
    const [showMenu, setShowMenu] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

    // State for Confirmation Modal
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    // Handle Dropdown Actions
    const handleMenuAction = async (e, action) => {
        e.stopPropagation(); // Prevent clicking the card
        setShowMenu(false); // Close the menu

        if (action === 'copy') {
            const inviteLink = `https://examsy.com/join/${id}/req-${Math.random().toString(36).substring(7)}`;
            try {
                await navigator.clipboard.writeText(inviteLink);
                setAlert({
                    show: true,
                    type: 'success',
                    title: 'Link Copied',
                    message: 'Invite link copied to clipboard successfully!',
                });
                setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
            } catch (err) {
                console.error("Failed to copy link: ", err);
            }
        } else if (action === 'delete') {
            // Open the Modal instead of a messy window.confirm
            setShowConfirmDelete(true);
        }
    };

    // Function to execute when confirmed in the modal
    const executeDelete = () => {
        if (onDelete) onDelete(id);
    };

    return (
        <>
            <div className="bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col">

                {/* --- HEADER SECTION --- */}
                <div
                    onClick={() => navigate(`/teacher/class/${id}`)}
                    className="h-28 relative cursor-pointer rounded-t-[2rem]"
                >
                    {/* 🟢 FIXED: Using inline style for the dynamic hex color to bypass Tailwind limitations */}
                    <div
                        className="absolute inset-0 overflow-hidden rounded-t-[2rem]"
                        style={{ backgroundColor: bannerColor || '#4F46E5' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-xl font-black hover:underline truncate pr-12">{title}</h3>

                            {/* --- MENU BUTTON & DROPDOWN --- */}
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(!showMenu);
                                    }}
                                    className={`text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-xl transition-colors ${showMenu ? 'bg-white/20 text-white' : ''}`}
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {/* Dropdown Menu */}
                                {showMenu && (
                                    <>
                                        {/* Transparent click mask to close menu */}
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}
                                        />

                                        <div className="absolute right-0 top-10 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">

                                            {/* Action 1: Copy Link */}
                                            <button
                                                onClick={(e) => handleMenuAction(e, 'copy')}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-examsy-text hover:bg-examsy-bg transition-colors flex items-center gap-3"
                                            >
                                                <LinkIcon size={16} className="text-examsy-muted" />
                                                Copy Invite Link
                                            </button>

                                            {/* Divider Line */}
                                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2"></div>

                                            {/* Action 2: Delete */}
                                            <button
                                                onClick={(e) => handleMenuAction(e, 'delete')}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-3"
                                            >
                                                <Trash2 size={16} />
                                                Delete Class
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="text-white/90 text-sm font-bold relative z-10">{section}</p>
                    </div>
                </div>

                {/* --- BODY SECTION --- */}
                <div className="p-6 h-32 flex items-center">
                    {/* 🟢 Applied the dynamic database color to the text of the class initials too! */}
                    <div
                        className="w-16 h-16 rounded-[1.2rem] bg-examsy-bg border-4 border-examsy-surface -mt-16 shadow-lg flex items-center justify-center font-black"
                        style={{ color: bannerColor || '#4F46E5' }}
                    >
                        {title?.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()}
                    </div>
                </div>

                {/* --- FOOTER SECTION --- */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 text-examsy-muted bg-examsy-bg/30 rounded-b-[2rem]">
                    <button
                        onClick={() => navigate(`/teacher/class/${id}` , {state: {defaultTab: 'grades'}})}
                        className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-colors"
                    >
                        <TrendingUp size={18} />
                    </button>
                    <button className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-colors">
                        <FolderOpen size={18} />
                    </button>
                </div>
            </div>

            {/* Custom Alert */}
            {alert.show && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}

            {/* Render the Confirm Modal */}
            <ConfirmActionModal
                isOpen={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={executeDelete}
                title="Delete Class?"
                message={`Are you sure you want to permanently delete "${title}"? This will remove all students and classwork. This action cannot be undone.`}
                confirmText="Delete Permanently"
                cancelText="Keep Class"
                isDanger={true}
            />
        </>
    );
};

export default TeacherClassCard;
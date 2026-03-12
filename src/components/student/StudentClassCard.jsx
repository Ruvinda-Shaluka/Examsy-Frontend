import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, User, BookOpen, LogOut, Flag } from 'lucide-react';
import ReportClassModal from './class-detail/ReportClassModal';
import CustomAlert from '../common/CustomAlert';
import ConfirmActionModal from '../common/ConfirmActionModal';
import { studentService } from "../../services/studentService.js";

// 🟢 FIX: Renamed props here as well
const StudentClassCard = ({ id, title, section, themeColorHex, bannerImageUrl, teacher, onUnenroll }) => {
    const navigate = useNavigate();

    // UI States
    const [showMenu, setShowMenu] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showConfirmUnenroll, setShowConfirmUnenroll] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

    const handleMenuAction = (e, action) => {
        e.stopPropagation();
        setShowMenu(false);

        if (action === 'unenroll') {
            setShowConfirmUnenroll(true);
        } else if (action === 'report') {
            setShowReportModal(true);
        }
    };

    const executeUnenroll = () => {
        if (onUnenroll) onUnenroll(id);
    };

    const handleReportSubmit = async (reportDetails) => {
        try {
            await studentService.fileReport({
                targetCourseId: id,
                ...reportDetails
            });

            setAlert({
                show: true,
                type: 'success',
                title: 'Report Filed',
                message: `Thank you. Our administrative team has been notified and will review "${title}" shortly.`,
            });
        } catch (error) {
            setAlert({
                show: true,
                type: 'error',
                title: 'Submission Failed',
                message: 'We could not process your report at this time. Please try again later.',
            });
        }
    };

    return (
        <>
            <div className="bg-examsy-surface rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500 group relative flex flex-col">

                {/* --- HEADER SECTION --- */}
                <div
                    onClick={() => navigate(`/student/class/${id}`)}
                    className="h-32 relative cursor-pointer rounded-t-[2.5rem]"
                >
                    {/* 🟢 FIX: Used the updated prop names */}
                    <div
                        className="absolute inset-0 overflow-hidden rounded-t-[2.5rem]"
                        style={{
                            backgroundColor: bannerImageUrl ? 'transparent' : (themeColorHex || '#4F46E5'),
                            backgroundImage: bannerImageUrl ? `url(${bannerImageUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {bannerImageUrl && <div className="absolute inset-0 bg-black/40 z-0" />}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl z-0" />
                    </div>

                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-2xl font-black hover:underline truncate pr-12 drop-shadow-md">{title}</h3>

                            <div className="absolute top-6 right-6">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(!showMenu);
                                    }}
                                    className={`text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-colors ${showMenu ? 'bg-white/20 text-white' : ''}`}
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {showMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}
                                        />

                                        <div className="absolute right-0 top-12 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                            <button
                                                onClick={(e) => handleMenuAction(e, 'unenroll')}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-examsy-text hover:bg-examsy-bg transition-colors flex items-center gap-3"
                                            >
                                                <LogOut size={16} className="text-examsy-muted" />
                                                Unenroll
                                            </button>

                                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2"></div>

                                            <button
                                                onClick={(e) => handleMenuAction(e, 'report')}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-3"
                                            >
                                                <Flag size={16} />
                                                Report abuse
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="text-white/90 font-bold drop-shadow-sm">{section}</p>
                    </div>
                </div>

                {/* --- BODY SECTION --- */}
                <div className="p-8 pt-4 space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-black text-white"
                            style={{ backgroundColor: themeColorHex || '#4F46E5' }} // 🟢 FIX: Updated here too
                        >
                            {teacher?.charAt(0) || 'T'}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-examsy-muted tracking-widest leading-none mb-1">Instructor</p>
                            <p className="font-bold text-examsy-text">{teacher}</p>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER SECTION --- */}
                <div className="px-8 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-examsy-bg/30 rounded-b-[2.5rem]">
                    <span className="text-[10px] font-black text-examsy-muted uppercase tracking-widest">Active Enrollment</span>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(`/student/class/${id}`, { state: { defaultTab: 'people' } })} className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-all">
                            <User size={18} />
                        </button>
                        <button onClick={() => navigate(`/student/class/${id}`, { state: { defaultTab: 'classwork'} })} className="p-2 hover:bg-examsy-primary/10 hover:text-examsy-primary rounded-xl transition-all">
                            <BookOpen size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <ReportClassModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                classTitle={title}
                onReportSubmit={handleReportSubmit}
            />

            {alert.show && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}

            <ConfirmActionModal
                isOpen={showConfirmUnenroll}
                onClose={() => setShowConfirmUnenroll(false)}
                onConfirm={executeUnenroll}
                title="Unenroll from Class?"
                message={`Are you sure you want to remove yourself from "${title}"? You will lose access to all materials and grades.`}
                confirmText="Yes, Unenroll"
                cancelText="Cancel"
                isDanger={true}
            />
        </>
    );
};

export default StudentClassCard;
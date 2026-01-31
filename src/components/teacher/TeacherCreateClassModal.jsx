import React from 'react';
import { X } from 'lucide-react';

const TeacherCreateClassModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-examsy-surface w-full max-w-md rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-black text-examsy-text">Create New Class</h2>
                    <button onClick={onClose} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted"><X size={20}/></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Class Name</label>
                        <input type="text" className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold" placeholder="e.g. Advanced Java" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Section / Room</label>
                        <input type="text" className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold" placeholder="e.g. Hall 04" />
                    </div>
                    <button className="w-full bg-examsy-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Create Class
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherCreateClassModal;
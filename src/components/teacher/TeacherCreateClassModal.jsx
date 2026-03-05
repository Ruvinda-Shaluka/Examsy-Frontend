import React, { useState } from 'react';
import { X } from 'lucide-react';

const TeacherCreateClassModal = ({ isOpen, onClose, onCreate }) => {
    const [className, setClassName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [academicTerm, setAcademicTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!className.trim()) return;

        setIsSubmitting(true);
        try {
            await onCreate({
                name: className.trim(),
                sectionName: sectionName.trim() || null,
                academicTerm: academicTerm.trim() || null
            });

            setClassName('');
            setSectionName('');
            setAcademicTerm('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-examsy-surface w-full max-w-md rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-black text-examsy-text">Create New Class</h2>
                    <button onClick={onClose} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted"><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Class Name *</label>
                        <input
                            type="text"
                            required
                            maxLength="100"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold"
                            placeholder="e.g. Advanced Java"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Section / Room</label>
                            <input
                                type="text"
                                maxLength="50"
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)}
                                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold"
                                placeholder="e.g. Hall 04"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-examsy-muted tracking-[0.2em] ml-1">Academic Term</label>
                            <input
                                type="text"
                                maxLength="50"
                                value={academicTerm}
                                onChange={(e) => setAcademicTerm(e.target.value)}
                                className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 outline-none focus:border-examsy-primary text-examsy-text font-bold"
                                placeholder="e.g. Fall 2026"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-examsy-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Class'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherCreateClassModal;
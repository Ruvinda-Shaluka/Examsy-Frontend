import React from 'react';

const ClassAppearanceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
            <div className="bg-examsy-surface w-full max-w-2xl rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black">Customize appearance</h2>
                        <button onClick={onClose} className="text-examsy-muted hover:text-examsy-text text-xl">✕</button>
                    </div>

                    <div className="h-32 w-full bg-examsy-primary rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    </div>

                    <div>
                        <p className="font-bold mb-4">Select theme color</p>
                        <div className="flex gap-4 flex-wrap">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    style={{ backgroundColor: color }}
                                    className="w-10 h-10 rounded-full border-4 border-examsy-surface hover:scale-110 transition-transform shadow-lg"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button className="flex-1 py-4 bg-examsy-bg rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">Select Photo</button>
                        <button onClick={onClose} className="flex-1 py-4 bg-examsy-primary text-white rounded-2xl font-black shadow-lg">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassAppearanceModal;
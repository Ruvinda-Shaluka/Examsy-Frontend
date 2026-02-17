import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

const ReportClassModal = ({ isOpen, onClose, classTitle, onReportSubmit }) => {
    const [selectedReason, setSelectedReason] = useState(null);

    if (!isOpen) return null;

    const reasons = [
        { id: 'spam', label: 'Spam or unwanted content' },
        { id: 'personal', label: 'Personal and confidential information' },
        { id: 'harmful', label: 'Hate speech or harmful behavior' },
        { id: 'illegal', label: 'Illegal activities or content' }
    ];

    const handleSubmit = () => {
        if (selectedReason) {
            onReportSubmit(selectedReason);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 w-full max-w-md rounded-[2rem] border border-zinc-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-white">

                <div className="p-8 space-y-6">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                            <ShieldAlert size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Report abuse</h2>
                            <p className="text-zinc-400 text-sm mt-1 font-medium">Why are you reporting <span className="text-white font-bold">{classTitle}</span>?</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {reasons.map((reason) => (
                            <label
                                key={reason.id}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedReason === reason.id
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-zinc-800 hover:bg-zinc-800/50'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedReason === reason.id ? 'border-blue-500' : 'border-zinc-500'
                                }`}>
                                    {selectedReason === reason.id && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                                </div>
                                <span className="font-bold text-sm">{reason.label}</span>
                                <input
                                    type="radio"
                                    name="report_reason"
                                    className="hidden"
                                    onChange={() => setSelectedReason(reason.id)}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-zinc-300 font-bold hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedReason}
                            className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
                        >
                            Submit Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportClassModal;
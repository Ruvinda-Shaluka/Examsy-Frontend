import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

const ReportClassModal = ({ isOpen, onClose, classTitle, onReportSubmit }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const categories = [
        { id: 'SPAM', label: 'Spam or unwanted content' },
        { id: 'PERSONAL_DATA', label: 'Personal information' },
        { id: 'HATE_SPEECH', label: 'Hate speech or behavior' },
        { id: 'ILLEGAL', label: 'Illegal activities' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onReportSubmit({
                category: selectedCategory,
                description: description,
                priorityLevel: priority
            });
            // Clear form
            setSelectedCategory('');
            setDescription('');
            setPriority('LOW');

            // 🟢 FIXED: Close the modal automatically after successful submission!
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-zinc-950 w-full max-w-lg rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-white relative">

                {/* 🟢 NEW: 'X' Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
                >
                    <X size={24} />
                </button>

                <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                            <ShieldAlert size={32} />
                        </div>
                        <div>
                            {/* 🟢 Increased font sizes */}
                            <h2 className="text-2xl font-black">Report Abuse</h2>
                            <p className="text-zinc-400 text-base font-bold mt-1">Class: <span className="text-white">{classTitle}</span></p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Category Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`text-left p-4 rounded-xl border-2 text-sm font-black transition-all ${
                                        selectedCategory === cat.id
                                            ? 'border-examsy-primary bg-examsy-primary/10 text-white'
                                            : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Priority Selection */}
                        <div className="flex gap-3">
                            {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-3 rounded-xl text-xs font-black tracking-widest transition-all ${
                                        priority === p ? 'bg-zinc-100 text-black shadow-md' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">Details</label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-base font-bold focus:border-red-500 outline-none h-28 resize-none transition-all"
                                placeholder="Explain why you are reporting this class..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3.5 text-zinc-400 font-black text-base hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!selectedCategory || !description || isSubmitting}
                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3.5 rounded-2xl text-base font-black transition-all shadow-lg shadow-red-600/20 active:scale-95"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportClassModal;
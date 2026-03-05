import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';

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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-zinc-950 w-full max-w-lg rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-white">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">Report Abuse</h2>
                            <p className="text-zinc-400 text-sm font-bold">Class: <span className="text-white">{classTitle}</span></p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Category Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`text-left p-3 rounded-xl border-2 text-xs font-black transition-all ${
                                        selectedCategory === cat.id
                                            ? 'border-examsy-primary bg-examsy-primary/10 text-white'
                                            : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Priority Selection */}
                        <div className="flex gap-2">
                            {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                                        priority === p ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-zinc-500'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Details</label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-sm font-bold focus:border-red-500 outline-none h-24 resize-none transition-all"
                                placeholder="Explain why you are reporting this class..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-zinc-400 font-black hover:text-white">Cancel</button>
                        <button
                            type="submit"
                            disabled={!selectedCategory || !description || isSubmitting}
                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 rounded-2xl font-black transition-all shadow-lg shadow-red-600/20"
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
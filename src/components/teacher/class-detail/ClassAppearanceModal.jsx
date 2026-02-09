import React from 'react';

const ClassAppearanceModal = ({ isOpen, onClose, currentColor, onColorSelect, onImageSelect }) => {
    if (!isOpen) return null;

    // Map your favorite Tailwind colors
    const colorOptions = [
        { hex: '#4f46e5', class: 'bg-indigo-600' },
        { hex: '#9333ea', class: 'bg-purple-600' },
        { hex: '#059669', class: 'bg-emerald-600' },
        { hex: '#db2777', class: 'bg-pink-600' },
        { hex: '#ea580c', class: 'bg-orange-600' },
        { hex: '#2563eb', class: 'bg-blue-600' },
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageSelect(reader.result);
                // Clear the hex color when an image is used
                onColorSelect('');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
            <div className="bg-examsy-surface w-full max-w-2xl rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black">Customize appearance</h2>
                        <button onClick={onClose} className="text-examsy-muted hover:text-examsy-text text-xl">✕</button>
                    </div>

                    {/* Live Preview within Modal */}
                    <div className={`h-32 w-full ${currentColor || 'bg-zinc-800'} rounded-3xl relative overflow-hidden transition-colors duration-300`}>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    </div>

                    <div>
                        <p className="font-bold mb-4">Select theme color</p>
                        <div className="flex gap-4 flex-wrap">
                            {colorOptions.map((opt) => (
                                <button
                                    key={opt.hex}
                                    onClick={() => {
                                        onColorSelect(opt.class);
                                        onImageSelect(null); // Remove image if color is chosen
                                    }}
                                    style={{ backgroundColor: opt.hex }}
                                    className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                                        currentColor === opt.class ? 'border-white shadow-xl scale-110' : 'border-examsy-surface'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <label className="flex-1 py-4 bg-examsy-bg rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center cursor-pointer">
                            Upload Image
                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </label>
                        <button onClick={onClose} className="flex-1 py-4 bg-examsy-primary text-white rounded-2xl font-black shadow-lg">
                            Apply Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassAppearanceModal;
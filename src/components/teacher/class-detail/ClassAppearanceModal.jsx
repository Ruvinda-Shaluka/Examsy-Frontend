import React, { useState } from 'react';
import { Loader2, Palette, Image as ImageIcon, X } from 'lucide-react';
import CustomAlert from '../../common/CustomAlert';

const ClassAppearanceModal = ({ isOpen, onClose, currentColor, onSave, isTeacher = false }) => {

    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });
    const [selectedColor, setSelectedColor] = useState(currentColor || '#4f46e5');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen || !isTeacher) return null;

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        setPreviewImage(null);
        setSelectedFile(null);
    };

    const handleApply = async () => {
        setIsSaving(true);
        try {
            let uploadedImageUrl = null;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
                const data = await uploadRes.json();
                uploadedImageUrl = data.secure_url;
            }

            await onSave({
                themeColorHex: uploadedImageUrl ? null : selectedColor,
                bannerImageUrl: uploadedImageUrl
            });

            setAlert({ show: true, type: 'success', title: 'Appearance Updated', message: 'Classroom theme saved successfully.' });

            setTimeout(() => {
                setAlert({ ...alert, show: false });
                onClose();
            }, 1500);

        } catch (error) {
            console.error("Save appearance error:", error);
            setAlert({ show: true, type: 'error', title: 'Update Failed', message: 'Could not save classroom appearance. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-examsy-surface w-full max-w-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">

                <div className="p-6 md:p-8 space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-examsy-text">Customize Theme</h2>
                            <p className="text-xs font-bold text-examsy-muted mt-1">Select a color or upload a custom banner.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-examsy-bg rounded-xl text-examsy-muted hover:text-examsy-text transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Live Preview Area */}
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1 mb-2">Live Preview</p>
                        <div
                            className="h-32 sm:h-40 w-full rounded-3xl relative overflow-hidden transition-all duration-300 shadow-inner flex items-end p-4 sm:p-6"
                            style={{
                                backgroundColor: previewImage ? 'transparent' : selectedColor,
                                backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {!previewImage && (
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />
                            )}

                            <h3 className="relative z-10 text-white font-black text-xl sm:text-2xl tracking-tight drop-shadow-md">
                                Your Class Title
                            </h3>
                        </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Custom Color Picker */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1">Theme Color</label>
                            <div className="relative group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary transition-colors h-14 bg-examsy-bg flex items-center px-4 gap-3">
                                <Palette size={18} className="text-zinc-500 group-hover:text-examsy-primary transition-colors shrink-0" />
                                <span className="text-sm font-bold text-examsy-text flex-1">
                                    {previewImage ? "Using Image" : selectedColor.toUpperCase()}
                                </span>

                                <input
                                    type="color"
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />

                                {!previewImage && (
                                    <div
                                        className="w-6 h-6 rounded-full shadow-inner border border-black/10 shrink-0"
                                        style={{ backgroundColor: selectedColor }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-1">Custom Banner</label>
                            <label className="relative group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-examsy-primary transition-colors h-14 bg-examsy-bg flex items-center px-4 gap-3">
                                <ImageIcon size={18} className="text-zinc-500 group-hover:text-examsy-primary transition-colors shrink-0" />
                                <span className="text-sm font-bold text-examsy-text truncate flex-1">
                                    {selectedFile ? selectedFile.name : 'Choose Image...'}
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept="image/jpeg, image/png, image/webp"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                            onClick={handleApply}
                            disabled={isSaving}
                            className="w-full h-14 bg-examsy-primary text-white rounded-2xl font-black shadow-lg shadow-examsy-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isSaving ? (
                                <><Loader2 size={18} className="animate-spin" /> Saving Changes...</>
                            ) : (
                                'Save Appearance'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {alert.show && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
        </div>
    );
};

export default ClassAppearanceModal;
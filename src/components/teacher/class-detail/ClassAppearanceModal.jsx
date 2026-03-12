import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import CustomAlert from '../../../components/common/CustomAlert.jsx';

const ClassAppearanceModal = ({ isOpen, onClose, currentColor, onSave }) => {
    const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });
    const [selectedColor, setSelectedColor] = useState(currentColor || '#4f46e5');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const colorOptions = ['#4f46e5', '#9333ea', '#059669', '#db2777', '#ea580c', '#2563eb'];

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

    const handleApply = async () => {
        setIsSaving(true);
        try {
            let uploadedImageUrl = null;

            // 1. Upload to Cloudinary if a file was selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                });
                const data = await uploadRes.json();
                uploadedImageUrl = data.secure_url;
            }

            // 2. Call the parent function to save to Database
            await onSave({
                themeColorHex: uploadedImageUrl ? null : selectedColor,
                bannerImageUrl: uploadedImageUrl
            });

            setAlert({ show: true, type: 'success', title: 'Appearance Updated', message: 'Classroom theme saved.' });
            setTimeout(() => {
                setAlert({ ...alert, show: false });
                onClose();
            }, 1500);

        } catch (error) {
            setAlert({ show: true, type: 'error', title: 'Upload Failed', message: 'Could not update appearance.' });
        } finally {
            setIsSaving(false);
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

                    {/* Live Preview */}
                    <div
                        className="h-32 w-full rounded-3xl relative overflow-hidden transition-all duration-300"
                        style={{
                            backgroundColor: previewImage ? 'transparent' : selectedColor,
                            backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {previewImage && <div className="absolute inset-0 bg-black/20" />}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    </div>

                    <div>
                        <p className="font-bold mb-4">Select theme color</p>
                        <div className="flex gap-4 flex-wrap">
                            {colorOptions.map((hex) => (
                                <button
                                    key={hex}
                                    onClick={() => {
                                        setSelectedColor(hex);
                                        setPreviewImage(null);
                                        setSelectedFile(null);
                                    }}
                                    style={{ backgroundColor: hex }}
                                    className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                                        selectedColor === hex && !previewImage ? 'border-white shadow-xl scale-110' : 'border-examsy-surface'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <label className="flex-1 py-4 bg-examsy-bg rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center cursor-pointer flex items-center justify-center">
                            Upload Image
                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </label>

                        <button
                            onClick={handleApply}
                            disabled={isSaving}
                            className="flex-1 py-4 bg-examsy-primary text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : 'Apply Changes'}
                        </button>
                    </div>
                </div>
            </div>
            {alert.show && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}
        </div>
    );
};

export default ClassAppearanceModal;
import React, { useState, useEffect, useRef } from 'react';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import { studentService } from '../../services/studentService.js';
import CustomAlert from '../../components/common/CustomAlert.jsx';
import { Mail, Smartphone, Shield, Save, Camera, User, BookOpen, Hash, FileText } from 'lucide-react';

const StudentSettings = () => {
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    // Holds the actual File object before uploading
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    // Holds the preview URL so the user can see it before saving
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    // 1. Initialize with EMPTY data
    const [profile, setProfile] = useState({
        name: '',
        major: '',
        id: '',
        bio: '',
        profileImage: null,
        avatar: 'S'
    });

    const [notifs, setNotifs] = useState({
        email: true,
        push: false,
        identity: true
    });

    // 2. Fetch real data on load
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await studentService.getProfile();
                setProfile({
                    name: data.fullName || '',
                    major: data.major || '',
                    id: data.studentIdentificationNumber || '',
                    bio: data.academicBio || '',
                    profileImage: data.profilePictureUrl || null,
                    avatar: data.fullName ? data.fullName.charAt(0).toUpperCase() : 'S'
                });
                setNotifs({
                    email: data.notifyEmail ?? true,
                    push: data.notifyPush ?? false,
                    identity: data.notifyIdentity ?? true
                });
            } catch (error) {
                console.error("Failed to load settings:", error);
                setAlert({ type: 'error', title: 'Error', message: 'Failed to load profile data.' });
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, []);

    // 3. Handle Image Selection (With Validation!)
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is larger than 5MB
            if (file.size > 5242880) {
                setAlert({
                    type: 'error',
                    title: 'File Too Large',
                    message: 'Please select an image smaller than 5MB.',
                    onClose: () => setAlert(null)
                });
                fileInputRef.current.value = ""; // Clear input
                return;
            }

            // Check if it's actually an image
            if (!file.type.startsWith('image/')) {
                setAlert({
                    type: 'error',
                    title: 'Invalid File',
                    message: 'Please select a valid image file (JPG, PNG).',
                    onClose: () => setAlert(null)
                });
                fileInputRef.current.value = ""; // Clear input
                return;
            }

            setSelectedImageFile(file); // Save the file to upload later

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result); // Show preview immediately
            };
            reader.readAsDataURL(file);
        }
    };

    // 4. Cloudinary Upload Helper (Using .env variables)
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // Grab keys from your .env file securely
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error("Cloudinary upload failed");
        }
    };

    // 5. The Master Save Function
    const handleSave = async () => {
        setIsSaving(true);
        setAlert(null);

        let finalImageUrl = profile.profileImage;

        try {
            // Check if there is a new image to upload
            if (selectedImageFile) {
                finalImageUrl = await uploadToCloudinary(selectedImageFile);
            }

            // Package the payload for Spring Boot
            const payload = {
                fullName: profile.name,
                major: profile.major,
                academicBio: profile.bio,
                profilePictureUrl: finalImageUrl,
                notifyEmail: notifs.email,
                notifyPush: notifs.push,
                notifyIdentity: notifs.identity
            };

            await studentService.updateProfile(payload);

            // Update local state so it looks correct without a refresh
            setProfile(prev => ({ ...prev, profileImage: finalImageUrl }));
            setSelectedImageFile(null); // Clear the selected file

            setAlert({
                type: 'success',
                title: 'Success!',
                message: 'Your profile and notification preferences have been saved.',
                onClose: () => setAlert(null)
            });

        } catch (error) {
            console.error("Failed to save:", error);
            setAlert({ type: 'error', title: 'Save Failed', message: 'Could not update your settings.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <StudentLayout><div className="p-10 text-center font-bold text-examsy-muted">Loading settings...</div></StudentLayout>;

    // Determine which image to show in the circle
    const displayImage = imagePreviewUrl || profile.profileImage;

    return (
        <StudentLayout>
            {/* The Custom Alert renders here if there is a message! */}
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={alert.onClose} />}

            <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-fade-in">

                {/* --- PROFILE SECTION --- */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-10 shadow-sm transition-colors duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-examsy-text">Student Profile</h2>
                            <p className="text-examsy-muted font-bold text-sm">Update your personal and academic identity.</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full sm:w-auto bg-examsy-primary text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Photo Upload Area */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-[48px] bg-examsy-primary/10 border-4 border-examsy-surface shadow-2xl overflow-hidden flex items-center justify-center text-examsy-primary text-5xl font-black">
                                    {displayImage ? (
                                        <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile.avatar
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute -bottom-2 -right-2 p-4 bg-examsy-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-transform z-10"
                                >
                                    <Camera size={20} />
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-examsy-muted">Square JPG or PNG</p>
                        </div>

                        {/* Text Fields */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={16} />
                                    <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Major / Field</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={16} />
                                    <input value={profile.major} onChange={e => setProfile({...profile, major: e.target.value})} className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 font-bold text-examsy-text outline-none focus:border-examsy-primary transition-all" />
                                </div>
                            </div>

                            {/* ID is Read Only */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Student Identification Number</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-examsy-muted" size={16} />
                                    <input value={profile.id} readOnly className="w-full bg-examsy-bg/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 font-bold text-examsy-muted outline-none cursor-not-allowed" />
                                </div>
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-black text-examsy-muted uppercase tracking-[0.2em] ml-1">Academic Bio</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 text-examsy-muted" size={16} />
                                    <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Tell us about your academic interests..." className="w-full bg-examsy-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 font-bold text-examsy-text h-32 resize-none outline-none focus:border-examsy-primary transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- NOTIFICATIONS SECTION --- */}
                <section className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-10 shadow-sm transition-colors duration-500">
                    <h2 className="text-2xl font-black text-examsy-text mb-8">Notification Preferences</h2>
                    <div className="space-y-4">
                        {[
                            { id: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive grade reports and class announcements via email.' },
                            { id: 'push', icon: Smartphone, label: 'Push Notifications', desc: 'Alerts for upcoming deadlines and exam reminders.' },
                            { id: 'identity', icon: Shield, label: 'Identity Alerts', desc: 'Get notified of proctoring flags or unauthorized logins.' }
                        ].map(item => (
                            <div key={item.id} className="flex justify-between items-center p-6 bg-examsy-bg rounded-3xl border border-zinc-200 dark:border-zinc-800/50">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-examsy-surface rounded-2xl text-examsy-primary"><item.icon size={22}/></div>
                                    <div className="pr-4">
                                        <p className="font-black text-examsy-text text-sm uppercase tracking-wider">{item.label}</p>
                                        <p className="text-xs font-bold text-examsy-muted leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNotifs({...notifs, [item.id]: !notifs[item.id]})}
                                    className={`shrink-0 w-14 h-7 rounded-full transition-all flex items-center px-1 ${notifs[item.id] ? 'bg-examsy-primary' : 'bg-zinc-400'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${notifs[item.id] ? 'translate-x-7' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </StudentLayout>
    );
};

export default StudentSettings;
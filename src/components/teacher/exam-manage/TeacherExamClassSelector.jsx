import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, BookOpen, GraduationCap } from 'lucide-react';
import { teacherService } from '../../../services/teacherService';

const TeacherExamClassSelector = ({ selected, onChange }) => {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const responseData = await teacherService.getClasses();

                // Safety check: if your service returns the full object instead of just the array,
                // we extract it using .data (or .data.data depending on your axios setup).
                const classList = Array.isArray(responseData)
                    ? responseData
                    : (responseData.data || []);

                setClasses(classList);
            } catch (error) {
                console.error("Failed to load classes", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const toggleClass = (id) => {
        const newSelection = selected.includes(id)
            ? selected.filter(i => i !== id)
            : [...selected, id];
        onChange(newSelection);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-examsy-primary">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-bold text-examsy-muted">Loading your classes...</p>
            </div>
        );
    }

    if (classes.length === 0) {
        return (
            <div className="py-20 text-center bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 border-dashed">
                <BookOpen size={48} className="mx-auto text-examsy-muted mb-4 opacity-30" />
                <h3 className="text-xl font-black text-examsy-text">No Classes Found</h3>
                <p className="text-examsy-muted font-bold mt-2">You need to create a class before assigning an exam.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(cls => {
                const isSelected = selected.includes(cls.id);

                // 🟢 MATCHING EXACT BACKEND JSON KEYS
                const displayTitle = cls.title || 'Untitled Class';
                const displaySection = cls.section || 'No Section';
                const bannerColor = cls.bannerColor || '#5227FF'; // Fallback to Examsy primary color if missing

                return (
                    <button
                        key={cls.id}
                        onClick={() => toggleClass(cls.id)}
                        className={`p-8 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group flex flex-col gap-4 ${
                            isSelected
                                ? 'shadow-lg shadow-black/5'
                                : 'border-zinc-200 dark:border-zinc-800 bg-examsy-surface hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                        // 🟢 Dynamically apply the backend bannerColor for the border when selected
                        style={{
                            borderColor: isSelected ? bannerColor : undefined,
                            backgroundColor: isSelected ? `${bannerColor}10` : undefined // Adds 10% opacity to the background
                        }}
                    >
                        {/* Dynamic Icon Box */}
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                isSelected ? 'text-white' : 'bg-examsy-bg text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                            }`}
                            style={{ backgroundColor: isSelected ? bannerColor : undefined }}
                        >
                            <BookOpen size={24} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-examsy-text mb-1 leading-tight">{displayTitle}</h3>
                            <div className="flex items-center gap-2 text-examsy-muted font-bold text-sm">
                                <GraduationCap size={16} />
                                <span>{displaySection}</span>
                            </div>
                        </div>

                        {/* Dynamic Checkmark Color */}
                        {isSelected && (
                            <CheckCircle2
                                className="absolute top-6 right-6 animate-in zoom-in"
                                size={28}
                                style={{ color: bannerColor }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default TeacherExamClassSelector;
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, BookOpen } from 'lucide-react';
import { teacherService } from '../../../services/teacherService'; // Import your service

const TeacherExamClassSelector = ({ selected, onChange }) => {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real classes from backend on component mount
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // Assuming you have a getClasses() method in teacherService
                const data = await teacherService.getClasses();
                setClasses(data);
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
            {classes.map(cls => (
                <button
                    key={cls.id}
                    onClick={() => toggleClass(cls.id)}
                    className={`p-8 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group ${
                        selected.includes(cls.id)
                            ? 'border-examsy-primary bg-examsy-primary/5 shadow-lg shadow-examsy-primary/10'
                            : 'border-zinc-200 dark:border-zinc-800 bg-examsy-surface hover:border-examsy-primary/30'
                    }`}
                >
                    <div className="relative z-10">
                        {/* Make sure these map to your actual Course entity fields (e.g., cls.name, cls.grade) */}
                        <h3 className="text-xl font-black text-examsy-text">{cls.name}</h3>
                        <p className="text-examsy-muted font-bold text-sm mt-1">{cls.gradeLevel || 'Class'}</p>
                    </div>
                    {selected.includes(cls.id) && (
                        <CheckCircle2 className="absolute top-4 right-4 text-examsy-primary animate-in zoom-in" size={24} />
                    )}
                </button>
            ))}
        </div>
    );
};

export default TeacherExamClassSelector;
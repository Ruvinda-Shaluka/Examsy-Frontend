import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MOCK_CLASSES } from '../../../data/TeacherTeachingData';

const TeacherExamClassSelector = ({ selected, onChange }) => {
    const toggleClass = (id) => {
        const newSelection = selected.includes(id)
            ? selected.filter(i => i !== id)
            : [...selected, id];
        onChange(newSelection);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CLASSES.map(cls => (
                <button
                    key={cls.id}
                    onClick={() => toggleClass(cls.id)}
                    className={`p-8 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group ${
                        selected.includes(cls.id)
                            ? 'border-examsy-primary bg-examsy-primary/5'
                            : 'border-zinc-200 dark:border-zinc-800 bg-examsy-surface'
                    }`}
                >
                    <div className="relative z-10">
                        <h3 className="text-xl font-black text-examsy-text">{cls.name}</h3>
                        <p className="text-examsy-muted font-bold">{cls.grade}</p>
                    </div>
                    {selected.includes(cls.id) && (
                        <CheckCircle2 className="absolute top-4 right-4 text-examsy-primary" size={24} />
                    )}
                </button>
            ))}
        </div>
    );
};

export default TeacherExamClassSelector;
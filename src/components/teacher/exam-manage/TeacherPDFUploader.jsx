import React from 'react';
import { FileUp, X, FileText } from 'lucide-react';

const TeacherPDFUploader = ({ file, onChange }) => {

    const handleFile = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === "application/pdf") {
            onChange(selected); // Pass file to parent state
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="bg-examsy-surface p-6 md:p-10 rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                    <FileText size={24} />
                </div>
                <h2 className="text-2xl font-black text-examsy-text">PDF Paper Upload</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Upload Zone */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase text-examsy-muted tracking-widest ml-2">Upload Exam Paper (PDF)</label>
                    {!file ? (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[40px] cursor-pointer hover:border-examsy-primary hover:bg-examsy-primary/5 transition-all group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-4 bg-examsy-bg rounded-2xl text-examsy-muted group-hover:text-examsy-primary transition-colors mb-4">
                                    <FileUp size={32} />
                                </div>
                                <p className="mb-2 text-sm text-examsy-text font-black">Click to upload or drag and drop</p>
                                <p className="text-xs text-examsy-muted font-bold tracking-tight mt-1">PDF documents only (Max 10MB)</p>
                            </div>
                            <input type="file" className="hidden" accept=".pdf" onChange={handleFile} />
                        </label>
                    ) : (
                        <div className="p-6 bg-examsy-bg rounded-[32px] border border-examsy-primary/30 flex items-center justify-between animate-zoom-in">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-examsy-primary text-white rounded-xl"><FileText size={20}/></div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-black text-examsy-text truncate max-w-[150px]">{file.name}</p>
                                    <p className="text-[10px] font-bold text-examsy-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onChange(null)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Instructions (Since scheduling is handled in Step 2) */}
                <div className="flex flex-col justify-center">
                    <div className="p-8 bg-examsy-primary/5 rounded-[32px] border border-examsy-primary/20">
                        <h4 className="text-sm font-black text-examsy-primary uppercase tracking-wider mb-3">Student Instructions</h4>
                        <p className="text-sm font-bold text-examsy-text leading-relaxed">
                            Students will be able to view and download this PDF paper within the secure examination portal.
                        </p>
                        <ul className="mt-4 space-y-2 text-xs font-bold text-examsy-muted list-disc list-inside">
                            <li>Ensure file is under 10MB</li>
                            <li>Make sure text is legible</li>
                            <li>Students will upload their written answers before the deadline set in Step 2.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherPDFUploader;
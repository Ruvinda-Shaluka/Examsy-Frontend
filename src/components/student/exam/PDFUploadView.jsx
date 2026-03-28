import React from 'react';
import { FileUp, FileCheck, Download, FileText } from 'lucide-react';

const PDFUploadView = ({ pdfUrl, file, onUpload }) => {

    // 🟢 NEW: The Proctor Bypass Hack
    // We temporarily flag the global window object. When the file picker opens and blurs the screen,
    // the hook will see this flag and ignore the blur.
    const handleFilePickerOpen = () => {
        window.isUploadingFile = true;

        // Listen for when the window regains focus (after the user closes the file picker)
        window.addEventListener('focus', () => {
            // Give it a tiny 1-second delay to settle, then turn proctoring back on
            setTimeout(() => { window.isUploadingFile = false; }, 1000);
        }, { once: true });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full">

            {/* 🟢 NEW: Real-Time PDF Embedded Viewer */}
            <div className="bg-examsy-surface p-4 md:p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800 flex-1 min-h-[400px] flex flex-col shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-black flex items-center gap-2"><FileText className="text-examsy-primary"/> Exam Paper</h2>
                        <p className="text-xs font-bold text-examsy-muted mt-1">Read the questions below. Write answers on a physical paper and upload the scan.</p>
                    </div>
                    {/* Fallback download just in case their browser blocks iframes */}
                    <a href={pdfUrl} download target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 bg-examsy-bg text-examsy-text border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shrink-0">
                        <Download size={14} /> Fallback Download
                    </a>
                </div>

                {/* The embedded PDF */}
                <iframe
                    src={`${pdfUrl}#toolbar=0`}
                    className="w-full flex-1 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    title="Exam PDF Viewer"
                />
            </div>

            {/* Upload Zone */}
            <label className="flex flex-col items-center justify-center w-full h-40 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] cursor-pointer hover:bg-examsy-primary/5 transition-all group bg-examsy-surface shrink-0 shadow-sm">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {file ? <FileCheck size={32} className="text-emerald-500 mb-2" /> : <FileUp size={32} className="text-examsy-muted group-hover:text-examsy-primary mb-2" />}
                    <p className="mb-1 text-sm font-black text-examsy-text">{file ? file.name : "Click to upload your scanned answer script"}</p>
                    <p className="text-[10px] text-examsy-muted uppercase font-black tracking-widest">Only PDF files are accepted (Max 25MB)</p>
                </div>
                {/* Notice the onClick handler here */}
                <input type="file" className="hidden" accept=".pdf" onClick={handleFilePickerOpen} onChange={(e) => onUpload(e.target.files[0])} />
            </label>
        </div>
    );
};

export default PDFUploadView;
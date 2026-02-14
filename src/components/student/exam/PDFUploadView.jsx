import React from 'react';
import { FileUp, FileCheck, Download } from 'lucide-react';

const PDFUploadView = ({ pdfUrl, file, onUpload }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-examsy-surface p-10 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
            <h2 className="text-xl font-black mb-2">Download Question Paper</h2>
            <p className="text-sm text-examsy-muted mb-6 font-bold">Write your answers on A4 paper, scan them, and upload the final PDF below.</p>
            <a href={pdfUrl} download className="flex items-center gap-2 bg-examsy-primary text-white px-8 py-3 rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-purple-500/30">
                <Download size={18} /> Download PDF
            </a>
        </div>

        <label className="flex flex-col items-center justify-center w-full h-72 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[40px] cursor-pointer hover:bg-examsy-primary/5 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? <FileCheck size={48} className="text-emerald-500 mb-4" /> : <FileUp size={48} className="text-examsy-muted group-hover:text-examsy-primary mb-4" />}
                <p className="mb-2 text-lg font-black">{file ? file.name : "Click to upload your answer script"}</p>
                <p className="text-[10px] text-examsy-muted uppercase font-black tracking-widest">Only PDF files are accepted (Max 25MB)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf" onChange={(e) => onUpload(e.target.files[0])} />
        </label>
    </div>
);

export default PDFUploadView;
import React, { useState } from 'react';
import { FileUp, FileCheck, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

// 🟢 BULLETPROOF VITE WORKER IMPORT:
// The '?url' tells Vite to bundle this worker perfectly without path errors.
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// (Deleted the broken CSS imports!)

const PDFUploadView = ({ pdfUrl, file, onUpload }) => {
    const [numPages, setNumPages] = useState(null);
    const [pdfError, setPdfError] = useState(false);

    // Bypasses proctoring when the file picker opens
    const handleFilePickerOpen = () => {
        window.isUploadingFile = true;
        window.addEventListener('focus', () => {
            setTimeout(() => { window.isUploadingFile = false; }, 1000);
        }, { once: true });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full">

            {/* 🟢 THE BULLETPROOF REACT-PDF VIEWER */}
            <div className="bg-examsy-surface p-4 md:p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800 flex-1 flex flex-col shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-black flex items-center gap-2">
                            <FileText className="text-examsy-primary"/> Exam Paper
                        </h2>
                        <p className="text-xs font-bold text-examsy-muted mt-1">
                            Read the questions below. Write answers on physical paper and upload the scan.
                        </p>
                    </div>
                    {/* Backup secure link */}
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-examsy-primary/10 text-examsy-primary border border-examsy-primary/20 px-4 py-2 rounded-xl font-black text-xs hover:bg-examsy-primary hover:text-white transition-all shrink-0">
                        <ExternalLink size={14} /> Open in New Tab
                    </a>
                </div>

                <div className="w-full flex-1 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-y-auto p-4 flex flex-col items-center h-[500px] relative">
                    {!pdfError ? (
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            onLoadError={(error) => {
                                console.error("PDF Load Error:", error);
                                setPdfError(true);
                            }}
                            loading={
                                <div className="flex flex-col items-center justify-center h-full text-examsy-muted mt-20">
                                    <Loader2 className="animate-spin mb-2" size={32} />
                                    <p className="font-bold text-sm">Securely loading exam paper...</p>
                                </div>
                            }
                        >
                            {/* Dynamically render all pages of the PDF */}
                            {Array.from(new Array(numPages), (el, index) => (
                                <div key={`page_${index + 1}`} className="mb-6 rounded-xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                                    <Page
                                        pageNumber={index + 1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        width={Math.min(window.innerWidth * 0.8, 800)} // Responsive width
                                    />
                                </div>
                            ))}
                        </Document>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <FileText size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                            <p className="text-examsy-text font-black mb-2">Secure Display Blocked</p>
                            <p className="text-sm text-examsy-muted font-bold mb-6 max-w-sm">
                                Your browser blocked the inline preview. Please click "Open in New Tab" above to view your exam securely.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* UPLOAD ZONE */}
            <label className="flex flex-col items-center justify-center w-full h-40 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] cursor-pointer hover:bg-examsy-primary/5 transition-all group bg-examsy-surface shrink-0 shadow-sm">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {file ? <FileCheck size={32} className="text-emerald-500 mb-2" /> : <FileUp size={32} className="text-examsy-muted group-hover:text-examsy-primary mb-2" />}
                    <p className="mb-1 text-sm font-black text-examsy-text">
                        {file ? file.name : "Click to upload your scanned answer script"}
                    </p>
                    <p className="text-[10px] text-examsy-muted uppercase font-black tracking-widest">
                        Only PDF files are accepted (Max 25MB)
                    </p>
                </div>
                <input type="file" className="hidden" accept=".pdf" onClick={handleFilePickerOpen} onChange={(e) => onUpload(e.target.files[0])} />
            </label>
        </div>
    );
};

export default PDFUploadView;
import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { FileText, Sparkles, CheckCircle, AlertCircle, Loader2, Save, ExternalLink } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import CustomAlert from '../../components/common/CustomAlert';
import { teacherService } from '../../services/teacherService';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const TeacherGrading = () => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [alert, setAlert] = useState(null);

    const [isGrading, setIsGrading] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);

    const [numPages, setNumPages] = useState(null);
    const [pdfError, setPdfError] = useState(false);
    const [finalScore, setFinalScore] = useState("");

    // 🟢 NEW STATE: For the approve button spinner
    const [isApproving, setIsApproving] = useState(false);

    useEffect(() => {
        const loadPendingGradings = async () => {
            try {
                const res = await teacherService.getPendingGradings();
                setSubmissions(res.data || []);
            } catch (error) {
                console.error("Failed to load pending submissions", error);
                setAlert({ type: 'error', title: 'Data Load Error', message: 'Could not fetch pending gradings.' });
            } finally {
                setIsLoadingData(false);
            }
        };
        loadPendingGradings();
    }, []);

    const handleSelectStudent = (submission) => {
        setSelectedSubmission(submission);
        setAiFeedback(null);
        setFinalScore("");
        setPdfError(false);
        setAlert(null);
    };

    const handleAiGrade = async () => {
        if (!selectedSubmission) return;

        setIsGrading(true);
        setAlert(null);

        try {
            const apiRes = await teacherService.autoGradeSubmission(selectedSubmission.examId, selectedSubmission.id);
            const aiData = apiRes.data;

            setAiFeedback({
                suggestedScore: aiData.suggestedScore,
                maxScore: aiData.maxScore,
                comments: aiData.comments,
                confidence: aiData.confidence,
                matchedConcepts: aiData.matchedConcepts || [],
                missingConcepts: aiData.missingConcepts || [],
                incorrectParts: aiData.incorrectParts || []
            });

            setFinalScore(aiData.suggestedScore);

        } catch (error) {
            console.error("AI Grading Error:", error);
            setAlert({
                type: 'error',
                title: 'Grading Failed',
                message: error.message || 'An error occurred during AI analysis.'
            });
        } finally {
            setIsGrading(false);
        }
    };

    // 🟢 UPDATED: Fully integrated with backend API
    const handleApproveGrade = async () => {
        if (!finalScore) {
            return setAlert({ type: 'error', title: 'Missing Score', message: 'Please enter a final score before approving.' });
        }

        setIsApproving(true);
        setAlert(null);

        try {
            await teacherService.approveAndReleaseGrade(
                selectedSubmission.examId,
                selectedSubmission.id,
                finalScore,
                aiFeedback?.comments || "Manually Graded"
            );

            setAlert({ type: 'success', title: 'Success', message: `Grade of ${finalScore} released successfully! Student has been notified.` });

            // Clear the workspace
            setSelectedSubmission(null);
            setAiFeedback(null);
            setFinalScore("");

            // Refresh the pending list so the graded student disappears
            const res = await teacherService.getPendingGradings();
            setSubmissions(res.data || []);

        } catch (error) {
            console.error("Failed to release grade:", error);
            setAlert({ type: 'error', title: 'Action Failed', message: error.message || 'Could not save the grade.' });
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <TeacherLayout>
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">

                {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-examsy-surface p-6 rounded-[32px] border border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-black text-examsy-text">Exam Grading Workspace</h1>
                        <p className="text-examsy-muted font-bold text-sm">Review PDF submissions, utilize AI analysis, and finalize grades.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN: Student Roster */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-examsy-muted ml-2">Pending Reviews</h3>

                        {isLoadingData ? (
                            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-examsy-primary" size={24} /></div>
                        ) : submissions.length === 0 ? (
                            <div className="p-4 text-center bg-examsy-surface border border-zinc-200 dark:border-zinc-800 rounded-3xl">
                                <p className="text-sm font-bold text-examsy-muted">No pending gradings.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {submissions.map(sub => (
                                    <button
                                        key={sub.id}
                                        onClick={() => handleSelectStudent(sub)}
                                        className={`w-full p-4 rounded-[24px] border text-left transition-all hover:scale-[1.02] ${selectedSubmission?.id === sub.id ? 'bg-examsy-primary text-white shadow-lg shadow-purple-500/30 border-examsy-primary' : 'bg-examsy-surface border-zinc-200 dark:border-zinc-800 text-examsy-text hover:border-examsy-primary/50'}`}
                                    >
                                        <p className="font-black truncate">{sub.studentName}</p>
                                        <p className="text-[10px] font-bold text-examsy-text/70 mt-0.5 truncate">{sub.examTitle}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest mt-2 ${selectedSubmission?.id === sub.id ? 'text-white/80' : 'text-amber-500'}`}>
                                            Status: {sub.status}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MIDDLE & RIGHT COLUMNS: Workspace */}
                    <div className="lg:col-span-3">
                        {!selectedSubmission ? (
                            <div className="h-[600px] flex flex-col items-center justify-center bg-examsy-surface rounded-[40px] border border-dashed border-zinc-300 dark:border-zinc-800 text-examsy-muted">
                                <FileText size={64} className="mb-4 opacity-50" />
                                <p className="font-black text-xl">No Student Selected</p>
                                <p className="font-bold text-sm">Select a student from the roster to begin grading.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                                {/* MIDDLE: Native PDF Viewer */}
                                <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col h-[700px] shadow-sm">
                                    <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 mb-4 flex justify-between items-center">
                                        <h3 className="font-black text-sm text-examsy-text">Student Answer Script</h3>

                                        <a
                                            href={selectedSubmission.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-examsy-primary/10 text-examsy-primary px-3 py-1.5 rounded-xl text-xs font-black hover:bg-examsy-primary hover:text-white transition-all"
                                        >
                                            <ExternalLink size={14} /> Open in Tab
                                        </a>
                                    </div>
                                    <div className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-900 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 p-4 relative">
                                        {!pdfError ? (
                                            <Document
                                                file={selectedSubmission.pdfUrl}
                                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                                onLoadError={() => setPdfError(true)}
                                                loading={<div className="flex justify-center mt-20"><Loader2 className="animate-spin text-examsy-muted" size={32} /></div>}
                                            >
                                                {Array.from(new Array(numPages), (el, index) => (
                                                    <div key={`page_${index + 1}`} className="mb-4 rounded-xl overflow-hidden shadow-md">
                                                        <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} width={400} />
                                                    </div>
                                                ))}
                                            </Document>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                                <AlertCircle size={48} className="text-red-500 mb-4" />
                                                <p className="font-black text-examsy-text">Failed to load PDF</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT: AI Assistant & Final Score */}
                                <div className="flex flex-col gap-6">

                                    <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-examsy-primary/10 rounded-2xl text-examsy-primary">
                                                <Sparkles size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-lg text-examsy-text">AI Analysis</h3>
                                                <p className="text-[10px] font-bold text-examsy-muted uppercase tracking-widest">Powered by Groq & OCR</p>
                                            </div>
                                        </div>

                                        {!aiFeedback ? (
                                            <button
                                                onClick={handleAiGrade}
                                                disabled={isGrading}
                                                className="w-full bg-examsy-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/30"
                                            >
                                                {isGrading ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                                                {isGrading ? 'Extracting & Analyzing Text...' : 'Run Smart Grading'}
                                            </button>
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                                                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center gap-2 text-emerald-600 font-black">
                                                            <CheckCircle size={18} /> Analysis Complete
                                                        </div>
                                                        <div className="px-3 py-1 bg-emerald-500 text-white rounded-xl text-sm font-black shadow-sm">
                                                            {aiFeedback.suggestedScore} / {aiFeedback.maxScore}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200 leading-relaxed">
                                                        {aiFeedback.comments}
                                                    </p>

                                                    {aiFeedback.missingConcepts?.length > 0 && (
                                                        <div className="mt-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                                            <p className="text-[10px] font-black uppercase text-red-600 mb-1">Missing Concepts</p>
                                                            <ul className="list-disc list-inside text-xs font-bold text-red-800 dark:text-red-300">
                                                                {aiFeedback.missingConcepts.map((concept, i) => <li key={i}>{concept}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {aiFeedback.incorrectParts?.length > 0 && (
                                                        <div className="mt-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                                            <p className="text-[10px] font-black uppercase text-amber-600 mb-1">Incorrect Elements</p>
                                                            <ul className="list-disc list-inside text-xs font-bold text-amber-800 dark:text-amber-300">
                                                                {aiFeedback.incorrectParts.map((concept, i) => <li key={i}>{concept}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                                <button onClick={() => setAiFeedback(null)} className="w-full py-3 text-xs font-black text-examsy-muted hover:text-examsy-text transition-colors">
                                                    Re-run Analysis
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-examsy-surface rounded-[40px] border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-sm mt-auto">
                                        <h3 className="font-black text-sm text-examsy-text mb-4">Final Teacher Verdict</h3>
                                        <div className="flex flex-col gap-4">
                                            <div className="relative">
                                                <label className="absolute -top-2.5 left-4 bg-examsy-surface px-2 text-[10px] font-black uppercase tracking-widest text-examsy-muted">Final Score</label>
                                                <input
                                                    type="number"
                                                    value={finalScore}
                                                    onChange={(e) => setFinalScore(e.target.value)}
                                                    placeholder="0"
                                                    className="w-full bg-transparent border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 font-black text-2xl text-examsy-text outline-none focus:border-examsy-primary transition-colors"
                                                />
                                            </div>

                                            {/* 🟢 UPDATED: Submit button with loading state */}
                                            <button
                                                onClick={handleApproveGrade}
                                                disabled={isApproving}
                                                className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black py-4 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                                            >
                                                {isApproving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                                {isApproving ? 'Saving & Notifying...' : 'Approve & Release Grade'}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TeacherGrading;
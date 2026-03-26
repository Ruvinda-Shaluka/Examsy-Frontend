import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import { studentService } from '../../services/studentService.js'; // 🟢 Real API Service

import ExamSetup from '../../components/student/mock-exam/ExamSetup';
import ExamGenerating from '../../components/student/mock-exam/ExamGenerating';
import QuizInterface from '../../components/student/mock-exam/QuizInterface';
import ExamResult from '../../components/student/mock-exam/ExamResult';

const MockExams = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState('setup');
    // 🟢 Added 'subject' to the config state
    const [config, setConfig] = useState({ subject: '', topic: '', difficulty: 'Intermediate', count: 5 });
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});

    const startAIGeneration = async () => {
        if (!config.subject || !config.topic) return alert("Please enter both a subject and a topic!");
        setStep('generating');

        try {
            // 🟢 Call your Spring Boot API
            const generatedExam = await studentService.generateMockExam(config);

            // Format the backend data to match what QuizInterface expects
            const formattedQuestions = generatedExam.questions.map((q) => ({
                id: q.id,
                q: q.questionText,
                options: [q.optionA, q.optionB, q.optionC, q.optionD],
                correct: q.correctOptionIndex,
                explanation: q.explanation
            }));

            setQuestions(formattedQuestions);
            setStep('quiz');
        } catch (error) {
            console.error("AI Generation Failed:", error);
            alert("Failed to generate exam. Please try again.");
            setStep('setup');
        }
    };

    const handleRetry = () => {
        setStep('setup');
        setAnswers({});
        setCurrentIdx(0);
    };

    return (
        <StudentLayout>
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-10">
                {step === 'setup' && (
                    <ExamSetup config={config} setConfig={setConfig} onStart={startAIGeneration} />
                )}
                {step === 'generating' && (
                    <ExamGenerating subject={config.subject} topic={config.topic} />
                )}
                {step === 'quiz' && (
                    <QuizInterface
                        questions={questions}
                        currentIdx={currentIdx}
                        setCurrentIdx={setCurrentIdx}
                        answers={answers}
                        setAnswers={setAnswers}
                        onFinish={() => setStep('result')}
                    />
                )}
                {step === 'result' && (
                    <ExamResult
                        topic={config.topic}
                        onRetry={handleRetry}
                        onDashboard={() => navigate('/student/dashboard')}
                    />
                )}
            </div>
        </StudentLayout>
    );
};

export default MockExams;
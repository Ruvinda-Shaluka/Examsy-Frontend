import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from "../../layouts/StudentLayout.jsx";
import { generateMockExamData } from '../../utils/mockGenerator';

// Modular Component Imports
import MockExamBreadcrumbs from '../../components/student/mock-exam/MockExamBreadcrumbs';
import ExamSetup from '../../components/student/mock-exam/ExamSetup';
import ExamGenerating from '../../components/student/mock-exam/ExamGenerating';
import QuizInterface from '../../components/student/mock-exam/QuizInterface';
import ExamResult from '../../components/student/mock-exam/ExamResult';

const MockExams = () => {
    const navigate = useNavigate();

    // Core Logic State
    const [step, setStep] = useState('setup');
    const [config, setConfig] = useState({ topic: '', difficulty: 'intermediate', count: 5 });
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});

    const startAIGeneration = () => {
        if (!config.topic) return alert("Please enter a topic!");
        setStep('generating');

        setTimeout(() => {
            const data = generateMockExamData(config.topic, config.count, config.difficulty);
            setQuestions(data);
            setStep('quiz');
        }, 2500);
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
                    <ExamGenerating topic={config.topic} />
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
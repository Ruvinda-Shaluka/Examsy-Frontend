import React from 'react';
import { BarChart3, MousePointer2, Zap } from 'lucide-react';
import TextPressure from '../logo/TextPressure.jsx';
import ScrollStack, { ScrollStackItem } from './ScrollStack.jsx';
import { useTheme } from '../../theme/useTheme.jsx';

const FeatureCard = ({ icon, title, desc }) => (
    <div className="h-[360px] w-full flex flex-col items-center justify-center text-center p-8 bg-examsy-bg rounded-[40px] border border-zinc-200 dark:border-zinc-800 shadow-xl transition-colors duration-500">
        <div className="text-examsy-primary mb-5">{React.cloneElement(icon, { size: 44 })}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-examsy-muted text-base leading-relaxed max-w-sm">{desc}</p>
    </div>
);

const LandingWhyChoose = () => {
    const { theme } = useTheme();
    return (
        <section className="relative bg-examsy-surface transition-colors duration-500">
            <div className="container mx-auto px-6 text-examsy-text">
                <div className="sticky top-20 z-50 pt-12 pb-8 bg-examsy-surface flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <h2 className="text-3xl md:text-4xl font-bold">Why Choose</h2>
                        <div className="h-[50px] md:h-[60px] w-[180px] md:w-[220px] relative">
                            <TextPressure text="Examsy ?" flex alpha={false} stroke={false} width weight={false} italic textColor={theme === 'dark' ? '#fff' : '#000'} strokeColor="#5227FF" minFontSize={32} />
                        </div>
                    </div>
                    <p className="text-sm md:text-base text-examsy-muted mt-4 max-w-xl px-4">Experience a smarter way to prepare, one module at a time.</p>
                </div>
                <div className="max-w-4xl mx-auto pb-24">
                    <ScrollStack itemStackDistance={18} stackPosition="50%" baseScale={0.98} blurAmount={3}>
                        <ScrollStackItem><FeatureCard icon={<MousePointer2 />} title="Interactive Exams" desc="Engage students with dynamic MCQs and real-time feedback loops." /></ScrollStackItem>
                        <ScrollStackItem><FeatureCard icon={<Zap />} title="AI-Powered OCR" desc="Digitize and grade handwritten papers in seconds with custom AI." /></ScrollStackItem>
                        <ScrollStackItem><FeatureCard icon={<BarChart3 />} title="Classroom Analytics" desc="Gain deep insights into performance and identify learning gaps." /></ScrollStackItem>
                    </ScrollStack>
                </div>
            </div>
        </section>
    );
};

export default LandingWhyChoose;
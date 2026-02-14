import React from 'react';

const ExamGenerating = ({ topic }) => (
    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-examsy-primary/20 border-t-examsy-primary rounded-full animate-spin" />
        <h2 className="text-xl font-black">AI is researching {topic}...</h2>
    </div>
);

export default ExamGenerating;
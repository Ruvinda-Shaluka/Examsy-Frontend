import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const StreamCoverView = ({ classInfo, onCustomize }) => {
    return (
        <div className={`relative h-64 w-full ${classInfo?.bannerColor || 'bg-examsy-primary'} rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl group transition-colors duration-500`}>
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />

            <div className="absolute inset-0 p-10 flex flex-col justify-end relative z-10">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                    {classInfo?.title}
                </h1>
                <p className="text-white/80 text-lg font-bold">
                    {classInfo?.section}
                </p>
            </div>

            <button
                onClick={onCustomize}
                className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold transition-all border border-white/20 z-20"
            >
                <ImageIcon size={18} /> Customize
            </button>
        </div>
    );
};

export default StreamCoverView;
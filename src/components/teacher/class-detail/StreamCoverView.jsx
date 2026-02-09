import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const StreamCoverView = ({ classInfo, bannerImage, onCustomize }) => {
    return (
        <div
            className={`relative h-64 w-full ${!bannerImage ? classInfo?.bannerColor : ''} rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl group transition-all duration-500`}
            style={bannerImage ? {
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            } : {}}
        >
            {/* Dark overlay if using an image to ensure text is readable */}
            {bannerImage && <div className="absolute inset-0 bg-black/40 z-0" />}

            {/* Glassmorphism decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl z-0" />

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
                className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold transition-all border border-white/20 z-20 shadow-lg"
            >
                <ImageIcon size={18} /> Customize
            </button>
        </div>
    );
};

export default StreamCoverView;
import React from 'react';

const GoogleAuthButton = ({ onClick, label = "Continue with Google" }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 bg-examsy-bg text-examsy-text border border-zinc-200 dark:border-zinc-800 rounded-xl hover:opacity-80 transition font-semibold shadow-sm"
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="G"
                className="w-5 h-5"
            />
            {label}
        </button>
    );
};

export default GoogleAuthButton;
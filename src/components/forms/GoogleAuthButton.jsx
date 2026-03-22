import React from 'react';

const GoogleAuthButton = ({ label = "Continue with Google", role }) => {

    const oauth2Endpoint = `http://localhost:8080/oauth2/authorization/google?role=${role}`;

    return (
        <a
            href={oauth2Endpoint}
            className="w-full flex items-center justify-center gap-3 py-3 bg-examsy-bg text-examsy-text border border-zinc-200 dark:border-zinc-800 rounded-xl hover:opacity-80 transition font-semibold shadow-sm cursor-pointer"
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
            />
            {label}
        </a>
    );
};

export default GoogleAuthButton;
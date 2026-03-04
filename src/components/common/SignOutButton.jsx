import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService.js'; // Adjust path if needed

const SignOutButton = ({ isOpen = true }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        authService.logout(); // Clears the token and role
        navigate('/login');   // Kicks them back to the login page
    };

    return (
        <button
            onClick={handleSignOut}
            className={`flex items-center gap-4 w-full p-3 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all duration-200 group ${!isOpen && 'justify-center'}`}
            title="Sign Out"
        >
            <LogOut size={22} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
            {isOpen && <span className="text-sm font-bold whitespace-nowrap">Sign Out</span>}
        </button>
    );
};

export default SignOutButton;
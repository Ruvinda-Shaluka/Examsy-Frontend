import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home, FileQuestion } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthHeader from '../components/auth/AuthHeader.jsx';

const NotFoundPage = () => {
    return (
        <AuthLayout
            image="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop"
            quote="Mistakes are the portals of discovery."
            author="James Joyce"
        >
            {/* Standardized Header to prevent layout shifts */}
            <AuthHeader
                badgeIcon={FileQuestion}
                badgeText="Error 404"
                title="Lost in the Hallway?"
                subtitle="The page you are looking for doesn't exist."
            />

            {/* Content area calibrated to 330px to prevent scrollbars */}
            <div className="min-h-[330px] flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-6 text-center lg:text-left">
                    <p className="text-lg text-examsy-muted font-bold leading-relaxed">
                        It seems you've taken a wrong turn. Don't worry, even the best students get lost sometimes. Let's get you back to your classes.
                    </p>

                    <div className="flex flex-col gap-4 pt-4">
                        <Link
                            to="/"
                            className="w-full bg-examsy-primary text-white h-14 rounded-2xl font-black text-lg shadow-xl shadow-examsy-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                        >
                            <ChevronLeft size={20} />
                            Return to Dashboard
                        </Link>

                        <Link
                            to="/login"
                            className="w-full bg-examsy-surface border border-zinc-200 dark:border-zinc-800 text-examsy-text h-14 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <Home size={20} className="text-examsy-muted" />
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>

            <p className="text-center text-examsy-muted mt-10 font-bold">
                Need help? <Link to="/" className="text-examsy-primary font-black hover:underline underline-offset-4">Contact Support</Link>
            </p>
        </AuthLayout>
    );
};

export default NotFoundPage;
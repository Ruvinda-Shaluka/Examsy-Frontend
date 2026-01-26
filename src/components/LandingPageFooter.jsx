import { Github, Linkedin, MessageSquare, Mail, ExternalLink } from "lucide-react";
import TextPressure from "./TextPressure.jsx";
import React from "react";

const LandingPageFooter = () => {
    // Function to handle the email contact button
    const handleContactClick = () => {
        window.location.href = "mailto:info@examsy.com?subject=Inquiry about Examsy";
    };

    return (
        <footer className="w-full bg-[#030712] text-white pt-12 pb-8 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Hero Section - Reduced Height & Compact Spacing */}
                <div className="text-center max-w-2xl mb-8 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Empowering Educators.
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Join us in empowering students and teachers with real-time digital precision.
                    </p>

                    {/* Updated Pill Buttons */}
                    <div className="flex justify-center gap-3 pt-2">
                        <button
                            onClick={() => window.open("https://www.worldbank.org/en/topic/education/overview", "_blank")}
                            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition"
                        >
                            <span>💡</span> Insights
                        </button>
                        <button
                            onClick={handleContactClick}
                            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition"
                        >
                            <Mail size={16} /> Contact
                        </button>
                    </div>
                </div>

                {/* Compact Divider */}
                <div className="w-full h-px bg-zinc-900 my-8"></div>

                {/* Bottom Bar: Logo, Copyright, Socials */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="relative h-10 w-28">
                            <TextPressure
                                text="Examsy!"
                                flex
                                alpha={false}
                                stroke={false}
                                width
                                weight={false}
                                italic
                                textColor="#465ed2"
                                strokeColor="#5227FF"
                                minFontSize={20}
                            />
                        </div>
                    </div>

                    {/* Copyright & Legal */}
                    <div className="text-center">
                        <p className="text-zinc-500 text-xs mb-1">
                            © {new Date().getFullYear()} Examsy. All Rights Reserved.
                        </p>
                        <div className="flex justify-center gap-4 text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                            <a href="#" className="hover:text-white transition">Status</a>
                            <a href="#" className="hover:text-white transition">Cookies</a>
                            <a href="#" className="hover:text-white transition">Security</a>
                        </div>
                    </div>

                    {/* Updated Socials & Developer Profile */}
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex gap-3">
                            <SocialIcon href="https://github.com/Ruvinda-Shaluka" icon={<Github size={18} />} />
                            <SocialIcon href="https://www.linkedin.com/in/ruvinda-shaluka-perera-564207325/" icon={<Linkedin size={18} />} />
                            <SocialIcon href="https://discord.gg/UQPGC6Dy" icon={<MessageSquare size={18} />} />
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-0.5 font-bold">Developed By</p>
                            <a href="https://github.com/Ruvinda-Shaluka" className="text-xs font-medium flex items-center gap-1.5 text-zinc-400 hover:text-white transition">
                                Ruvinda Shaluka <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-all duration-300"
    >
        {icon}
    </a>
);

export default LandingPageFooter;
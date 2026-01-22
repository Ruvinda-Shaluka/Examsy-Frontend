import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import TextPressure from "./TextPressure.jsx";
import React from "react";

const LandingPageFooter = () => {
    return (
        <footer className="w-full bg-slate-950 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-indigo-500">
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
                        minFontSize={28}
                    />
                    </h3>
                    <p className="text-slate-400 text-sm">Empowering educators with real-time exam tools.</p>
                </div>

                <div className="text-center md:text-left">
                    <h4 className="text-sm font-bold uppercase text-slate-500 mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-sm font-bold uppercase text-slate-500 mb-4">Connect</h4>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-white transition"><Twitter /></a>
                        <a href="https://github.com/Ruvinda-Shaluka" className="text-slate-400 hover:text-white transition"><Github /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default LandingPageFooter;
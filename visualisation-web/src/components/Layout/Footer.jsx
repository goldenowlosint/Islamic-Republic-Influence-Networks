import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 py-3 px-6 flex justify-center items-center z-50">
            <a
                href="https://github.com/freeirandev/IR-Influense-network-visulized"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
                <Github size={16} />
                <span>View on GitHub</span>
            </a>
        </footer>
    );
};

export default Footer;

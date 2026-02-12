import React from 'react';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Resume', href: '/resume.pdf', external: true },
];

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-background/90 border-b border-gray-100 py-4">
            <div className="container mx-auto px-4 max-w-5xl flex justify-between items-center">
                <a href="#" className="text-xl font-bold tracking-tight">
                    easwaran.
                </a>
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="text-secondary hover:text-primary transition-colors text-sm font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        <span className="text-xs font-medium text-green-700">Open to Work</span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;

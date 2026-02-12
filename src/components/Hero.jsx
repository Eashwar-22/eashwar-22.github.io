import React from 'react';

const Hero = () => {
    return (
        <div className="min-h-[60vh] flex items-center pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-6 mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                            Hi, I'm <br /> Eashwar.
                        </h1>
                        <img
                            src="/profile.jpg"
                            alt="Easwaran"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top transition-all duration-500 border border-gray-100 flex-shrink-0"
                        />
                    </div>

            

                    <div className="flex gap-4">
                        <a href="#projects" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity text-sm">
                            View Work
                        </a>
                        <a href="#contact" className="border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

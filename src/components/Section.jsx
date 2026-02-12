import React from 'react';

const Section = ({ id, className = "", children }) => {
    return (
        <section id={id} className={`py-12 md:py-20 ${className}`}>
            <div className="container mx-auto px-4 max-w-5xl">
                {children}
            </div>
        </section>
    );
};

export default Section;

import React from 'react';
import Section from './Section';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <Section id="contact">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                <p className="text-secondary mb-12">
                    I'm currently based in Berlin, Germany.
                    If you have a project or opportunity that aligns with my skills in ML and DS, I'd love to hear from you!
                </p>

                <a
                    href="mailto:hariharaneaswaran@gmail.com"
                    className="inline-flex items-center gap-2 text-2xl font-bold hover:text-secondary transition-colors mb-12"
                >
                    <Mail className="w-6 h-6" />
                    hariharaneaswaran@gmail.com
                </a>

                <div className="flex justify-center gap-8">
                    <a href="https://github.com/Eashwar-22" className="p-4 bg-surface rounded-full hover:bg-gray-100 transition-colors">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/easwaran-tuticorin-harihara-subramanian-47ba68141/" className="p-4 bg-surface rounded-full hover:bg-gray-100 transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>

                
            </div>
        </Section>
    );
};

export default Contact;

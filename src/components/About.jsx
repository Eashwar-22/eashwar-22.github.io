import React from 'react';
import Section from './Section';

const skills = [
    { category: "Languages", items: ["Python", "SQL", "Bash"] },
    { category: "ML & Data", items: ["PyTorch", "LangChain", "Pandas", "Scikit-learn", "MCP","dbt"] },
    { category: "Tools & Ops", items: ["Docker", "Git", "AWS", "Snowflake","Excel"] },
    { category: "5 minutes to Deadline", items: ["Gemini"] }
];

const About = () => {
    return (
        <Section id="about">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-base text-secondary leading-relaxed">
                    <p>
                        I'm a master's student in Machine Learning @ Uni Tübingen, currently working on Neural Information Retrieval for my thesis (almost at finish line). I am just looking for an opportunity to get my hands dirty with data and math.
                    </p>
                    <p>
                        For about 3 years, I worked in the Data Science field where I built production pipelines and optimized models for real-world constraints. I believe in writing code that is clean and testable.
                    </p>
                    <p>
                        When I'm not coding, I'm probably making music, scrolling through reels or exploring the beautiful Berlin.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="space-y-4">
                        {skills.map((skillGroup) => (
                            <div key={skillGroup.category}>
                                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{skillGroup.category}</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {skillGroup.items.map((skill) => (
                                        <span key={skill} className="px-2.5 py-0.5 bg-zinc-100 rounded-md text-sm text-zinc-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;

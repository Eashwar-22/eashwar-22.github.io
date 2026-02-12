import React from 'react';
import Section from './Section';

const Experience = () => {
    const experiences = [
        {
            company: "Tübingen Institute for Medical Education",
            role: "Research Student - Programming and Web Interface",
            period: "Nov 2023 - Jul 2024",
            description: "Solo-built a full-stack survey platform analyzing data from 200+ medical students. I architected the backend with PHP & MySQL to handle sensitive data securely, then built a dashboard with Chart.js to make the educational insights pop. Basically, I turned dry survey data into a visual story.",
            location: "Tübingen, Germany",
            skills: ["PHP", "MySQL", "Pandas",]
        },
        {
            company: "Sony B.V. Stuttgart Technology Center",
            role: "Working Student - Machine Learning Engineer",
            period: "Mar 2023 - Aug 2023",
            description: "Teamed up with R&D to push the boundaries of Neural Architecture Search (NAS). I ran over 20 comparative experiments in PyTorch, tuning hyperparameters until we squeezed out a projected 20% performance boost. Also kept our GitLab repo squeaky clean.",
            location: "Stuttgart, Germany",
            skills: ["PyTorch", "Python", "GitLab", "Optimization"]
        },
        {
            company: "Verloop.io",
            role: "Data Analyst",
            period: "Mar 2022 - Sep 2022",
            description: "Used NLP (Topic Modeling & Sentiment Analysis) to read thousands of user chats so humans didn't have to. I spotted key pain points and built dashboards to show them off. Plus, I wrote Python scripts that automated our weekly reporting, saving the team 70% of their manual grunt work.",
            location: "Bengaluru, India",
            skills: ["NLP", "Python", "Matplotlib", "Pandas", "OOPS"]
        },
        {
            company: "Quantum AI Systems",
            role: "Machine Learning Intern",
            period: "Jan 2021 - Feb 2022",
            description: "Taught deep learning models to 'watch' video. I implemented ConvLSTM and LRCN networks for video classification, building a full pipeline from OpenCV preprocessing to TensorFlow training. Finally, I wrapped it all in a user-friendly Flask web app so it was actually usable.",
            location: "Hyderabad, India",
            skills: ["TensorFlow", "Keras", "OpenCV", "Flask", "Deep Learning"]
        },
        {
            company: "Tiger Analytics",
            role: "Senior Data Analyst",
            period: "Jan 2020 - Nov 2021",
            description: "Started as an intern crunching numbers manually in Excel, but I didn't stay there long. I grinded my way up to Senior Data Analyst by replacing spreadsheets with Python scripts and building complex Conjoint Analysis models. My code ended up driving pricing strategy for a global fast-food giant, boosting revenue by 10-15% across 15+ markets.",
            location: "Chennai, India",
            skills: ["Python", "Conjoint Analysis", "Optimization", "Excel", "COBYLA", "PostgreSQL"]
        }
    ];

    return (
        <Section id="experience">
            <h2 className="text-3xl font-bold mb-12">Work Experience</h2>

            <div className="max-w-3xl mx-auto">
                <div className="relative border-l border-gray-200 ml-3 space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 md:pl-12 group">
                            {/* Dot on the timeline */}
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-gray-200 rounded-full border-2 border-white group-hover:bg-primary transition-colors duration-300"></div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-primary group-hover:text-blue-600 transition-colors">{exp.role}</h3>
                                <span className="text-sm text-secondary font-mono mt-1 sm:mt-0">{exp.period}</span>
                            </div>

                            <div className="mb-3">
                                <span className="text-base font-medium text-gray-700">{exp.company}</span>
                                <span className="text-sm text-gray-500 mx-2">•</span>
                                <span className="text-sm text-gray-500">{exp.location}</span>
                            </div>

                            <p className="text-secondary leading-relaxed text-sm md:text-base mb-4">
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Experience;

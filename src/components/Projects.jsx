import React from 'react';
import Section from './Section';
import { ArrowUpRight } from 'lucide-react';

const projectsData = [


    
    {
        title: "Reproducing the Paper: Hypencoder - Hypernetworks for Neural Information Retrieval",
        description: "I retrained the Hypencoder, a neural information retrieval system, from scratch. It generates a custom brain for every single query to grade documents token-by-token. It's a token level model that hunts for precise evidence instead of general topics—beating standard models like the Bi-encoder because it actually reads nuances of the details. End goal of the project is to prove that it cannot act as a universal approximator for all retrieval models, as claimed in the paper.",
        tags: ["PyTorch", "Hypernetworks", "SLURM", "Neural IR"],
        link: ""
    },
    {
        title: "Sentinel-CI",
        description: "I built an automated quality gate that intercepts every PR and uses an AI model to audit it for security risks and anti-patterns. It strictly blocks bad merges and creates a stat dashboard, ensuring code standards are constantly enforced without burning out human reviewers.",
        tags: ["GitHub Actions", "Streamlit", "DevSecOps"],
        link: "https://github.com/Eashwar-22/sentinel-ci"
    },
    {
        title: "Berlin Logistics Agent",
        description: "A simulated, multi-modal AI system designed to optimize delivery logistics in Berlin. It integrates a reasoning AI agent with a simple Random Forest Regressor to predict delivery times based on synthetic data. Features include Explainable AI (SHAP) for transparency, automatic PII anonymization for GDPR compliance and a FastMCP server that exposes the agent as a modular tool for external applications.",
        tags: ["LangGraph", "Scikit-Learn", "FastMCP", "XAI"],
        link: "https://github.com/Eashwar-22/berlin_logistics_agent"
    },
    {
        title: "Robust AI Agent Framework",
        description: "I built a stress-test arena using LangGraph to specifically try and break them by corrupting data, injecting prompt hacks, etc. On a simulation level, if an agent survives my framework, it's actually ready for production.",
        tags: ["LangGraph", "Pandas"],
        link: "https://github.com/Eashwar-22/ReAct_Robustness"
    },
    {
        title: "RAG Living Lore Engine",
        description: "NPCs usually forget everything or hallucinate. I fixed that by giving them two brains: one for the 'Textbook' (Lore) and one for the 'Diary' (Memories). Built with ChromaDB, this engine runs fully offline.",
        tags: ["RAG", "ChromaDB", "Ollama"],
        link: "https://github.com/Eashwar-22/RAG_living_lore_game_engine"
    },

    {
        title: "Passive-Aggressive Email Polisher",
        description: "I fine-tuned a simple T5 model to translate the raw frustration text into perfect corporate-speak. Optimized to INT8 (4x smaller) so it runs locally — no GPU required.",
        tags: ["HuggingFace", "T5 Transformer", "Quantization", "NLP"],
        link: "https://github.com/Eashwar-22/Corporate-Text-Polisher"
    },
    {
        title: "Tinfoil Hat Search Engine",
        description: "A local, privacy-focused GraphRAG engine that connects mundane objects to grand conspiracies. It creates a 3D knowledge graph connecting, for example, a 'Toaster' to 'The Illuminati', and uses an LLM to generate a paranoid narrative explaining the link. It's a simple tool that demonstrates GraphRAG & Local LLM tech.",
        tags: ["GraphRAG", "LangChain", "Ollama", "Three.js"],
        link: "https://github.com/Eashwar-22/tinfoil-hat-engine"
    },
    {
        title: "Medical Data Analytics Platform",
        description: "Turned a huge pile of dry survey data from 200+ medical professionals into a clean, interactive dashboard. I architected the whole stack (PHP/MySQL) to be secure and fast. It's a database that tells the story of healthcare trends.",
        tags: ["PHP", "MySQL", "JavaScript", "Full-Stack"],
        link: ""
    },
    {
        title: "Video Classification Pipeline",
        description: "Teaching models to watch video, not just see frames. I pit ConvLSTM against LRCN architectures to see which one better understands time and motion. Wrapped it in a Flask app so you can actually drag-and-drop a video to test it.",
        tags: ["TensorFlow", "Computer Vision", "Flask", "ConvLSTM"],
        link: "https://github.com/Eashwar-22/Video-Classification-using-OpenCV-and-tensorflow"
    },
    {
        title: "Reading Impact Analysis",
        description: "Does controversy sell? I (along with my friends) built a custom Selenium scraper to pull data for 40 years of bestsellers, defining 'controversy' mathematically based on rating variance. Our analysis found a strong negative correlation with ratings, but zero proof that controversy actually boosts sales.",
        tags: ["Selenium", "Pandas","Matplotlib"],
        link: "https://github.com/Eashwar-22/reading-impact-analysis/tree/main"
    },
];

const Projects = () => {
    return (
        <Section id="projects">
            <h2 className="text-3xl font-bold mb-8">Some of the things I've built...</h2>

            <div className="flex flex-col gap-10 max-w-3xl mx-auto">
                {projectsData.map((project, index) => (
                    <div key={index} className="w-full flex gap-4 items-start">
                        <span className="text-primary mt-1.5 align-top service-bullet">●</span>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-bold">
                                    {project.link ? (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 group">
                                            {project.title}
                                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                                        </a>
                                    ) : (
                                        project.title
                                    )}
                                </h3>
                            </div>

                            <p className="text-secondary text-base leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-1">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs text-zinc-500 font-mono">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Projects;

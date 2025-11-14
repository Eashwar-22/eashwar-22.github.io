import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- Font Import ---
// We add a style tag to import the "Inter" font, 
// which is the standard for minimalist, sophisticated design.
const StyleInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }

    /* Style for horizontal scrollbar */
    .horizontal-scroll-container::-webkit-scrollbar {
      height: 8px;
    }
    .horizontal-scroll-container::-webkit-scrollbar-track {
      background: #f1f5f9; /* bg-slate-100 */
      border-radius: 10px;
    }
    .horizontal-scroll-container::-webkit-scrollbar-thumb {
      background: #94a3b8; /* bg-slate-400 */
      border-radius: 10px;
    }
    .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
      background: #64748b; /* bg-slate-500 */
    }
  `}</style>
);


// --- Data ---
const personalInfo = {
  name: "Easwaran Subramanian",
  email: "hariharaneaswaran@gmail.com",
  linkedin: "https://www.linkedin.com/in/easwaran-subramanian/",
  github: "https://github.com/eashwar-22",
  headline: "MLOps, Generative AI, and Predictive Modeling",
  summary: "As a dedicated professional and master's in Machine Learning student, I am driven by the challenge of creating and scaling advanced AI systems. My 3+ years of experience has led to a strong interest in operationalising generative AI."
};

const skills = [
  "Python", "PyTorch", "LangGraph", "LLMs", "MLOps", "Docker", "AWS", "SQL",
  "scikit-learn", "Pandas", "Flask", "Git", "NLP", "Computer Vision", "React",
  "PostgreSQL", "Java", "JIRA", "W&B", "matplotlib", "seaborn",
];

const experiences = [
  {
    company: "Tübingen Institute for Medical Education",
    title: "Research Student",
    duration: "2023 - 2024",
    description: "Built a web interface to analyse survey data for 200+ medical students, including a secure admin page with PHP/MySQL."
  },
  {
    company: "Sony B.V. Stuttgart",
    title: "ML Engineer (Working Student)",
    duration: "2023",
    description: "Built a custom Neural Architecture Search (NAS) framework, validating a projected 20% performance increase."
  },
  {
    company: "Verloop.io",
    title: "Data Analyst",
    duration: "2022",
    description: "Automated reporting pipelines, reducing weekly report generation time by 70%."
  },
  {
    company: "Tiger Analytics",
    title: "Senior Data Analyst",
    duration: "2020 - 2021",
    description: "Delivered pricing recommendations projected to drive a 10-15% revenue increase across 15+ global markets."
  }
];

const projects = [
  {
    title: "Masters Thesis: Reproducing the Hypencoder",
    description: "Reimplementing the Hypencoder framework, a novel Information Retrieval (IR) model using hypernetworks.",
    tech: ["PyTorch", "Hypernetworks", "IR"],
    link: "#",
    image: "https://placehold.co/600x400/1e293b/94a3b8?text=Hypencoder"
  },
  {
    title: "AI Agent Robustness Testing",
    description: "Developed a framework to test a ReAct-style LLM agent against data corruption using LangGraph.",
    tech: ["LangGraph", "LLM", "ReAct Agent"],
    link: "#",
    image: "https://placehold.co/600x400/1e293b/94a3b8?text=AI+Agent"
  },
  {
    title: "Price Optimisation Model",
    description: "Developed a price optimisation model using Conjoint Analysis and the COBYLA algorithm.",
    tech: ["Python", "Conjoint Analysis", "COBYLA"],
    link: "#",
    image: "https://placehold.co/600x400/1e293b/94a3b8?text=Optimization"
  },
  {
    title: "Video Classification",
    description: "Implemented and compared ConvLSTM and LRCN deep learning models for video classification.",
    tech: ["ConvLSTM", "LRCN", "TensorFlow"],
    link: "#",
    image: "https://placehold.co/600x400/1e293b/94a3b8?text=Video+CV"
  },
];

// --- DYNAMIC COMPONENTS ---

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, inView];
};

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={`
        transition-opacity duration-1000 transform 
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

// --- PAGE COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 px-4 py-3 bg-white/70 backdrop-blur-lg rounded-full border border-gray-200 shadow-sm">
          <a href="#" className="text-xl font-bold text-slate-900 px-2">
            ES
          </a>
          <div className="w-px h-6 bg-gray-200" />
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={`mailto:${personalInfo.email}`}
            className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Contact
          </a>
        </div>
        
        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-slate-900 p-3 bg-white/70 backdrop-blur-lg rounded-full border border-gray-200 shadow-sm"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg rounded-lg mt-4 p-4 border border-gray-200 shadow-lg w-[80vw]">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-600 hover:text-slate-900 transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href={`mailto:${personalInfo.email}`}
              className="bg-slate-900 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-slate-700 transition-colors w-full text-center"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section id="hero" className="min-h-screen flex flex-col justify-center p-6 md:p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-8xl md:text-9xl lg:text-[13rem] font-extrabold text-transparent tracking-tighter -ml-1
                      bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400">
        Easwaran
      </h1>
      <h1 className="text-8xl md:text-9xl lg:text-[13rem] font-extrabold text-slate-900 tracking-tighter -ml-1 mb-8">
        Subramanian
      </h1>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl mb-6 md:mb-0">
          {personalInfo.headline}
        </h2>
        
        <div className="flex space-x-4">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-slate-900 transition-colors"
          >
            <Github className="w-7 h-7" />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-slate-900 transition-colors"
          >
            <Linkedin className="w-7 h-7" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-gray-500 hover:text-slate-900 transition-colors"
          >
            <Mail className="w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <AnimatedSection id="about" className="py-24 md:py-48 px-6 md:px-8">
    <div className="max-w-4xl mx-auto">
      <p className="text-3xl md:text-5xl font-medium text-slate-900 leading-tight">
        {personalInfo.summary}
      </p>
    </div>
  </AnimatedSection>
);

const SkillsMarquee = () => {
  const marqueeSkills = [...skills, ...skills, ...skills];
  return (
    <AnimatedSection className="py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes marquee-light {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-light-content {
          animation: marquee-light 80s linear infinite;
        }
      `}</style>
      <div className="relative flex w-full">
        <div className="marquee-light-content flex flex-nowrap items-center">
          {marqueeSkills.map((skill, index) => (
            <span 
              key={index} 
              className="text-6xl md:text-8xl font-bold text-gray-200 hover:text-gray-300 transition-colors mx-8"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// --- NEW DYNAMIC "STICKY" SECTIONS ---

const Experience = () => (
  <section id="experience" className="py-24 md:py-32 px-6 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sticky Title */}
      <div className="md:col-span-1 md:sticky top-24 h-fit">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Experience</h2>
      </div>
      
      {/* Scrolling Content */}
      <div className="md:col-span-3">
        <div className="relative border-l border-gray-200">
          {experiences.map((job, index) => (
            <div key={index} className="mb-16 ml-8">
              <span className="absolute -left-2.5 flex items-center justify-center w-5 h-5 bg-slate-900 rounded-full">
              </span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{job.duration}</span>
              <h3 className="text-2xl font-medium text-slate-900 mt-2">{job.title}</h3>
              <h4 className="text-xl font-medium text-gray-600 mb-3">{job.company}</h4>
              <p className="text-gray-600 text-lg">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-24 md:py-32 px-6 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sticky Title */}
      <div className="md:col-span-1 md:sticky top-24 h-fit">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Projects</h2>
      </div>
      
      {/* Horizontal Scrolling Content */}
      <div className="md:col-span-3">
        <div className="horizontal-scroll-container flex space-x-8 overflow-x-auto pb-8">
          {projects.map((project, index) => (
            <a 
              href={project.link} 
              key={index}
              className="group w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0"
            >
              <div className="mb-4 overflow-hidden rounded-lg shadow-xl border border-gray-100">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/ef4444/ffffff?text=Image+Failed"; }}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-lg mb-4">{project.description}</p>
              <div className="flex flex-wrap">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full mr-2 mb-2 border border-blue-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
          {/* Spacer to allow scrolling to the end */}
          <div className="w-1 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-24 px-6 md:px-8 bg-slate-900 text-gray-100">
    <div className="max-w-7xl mx-auto">
      <h3 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h3>
      <p className="text-lg text-gray-300 mb-8 max-w-lg">
        I'm open to new opportunities and collaborations. Feel free to reach out.
      </p>
      
      <div className="flex space-x-6 mb-16">
        <a 
          href={personalInfo.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Github className="w-8 h-8" />
        </a>
        <a 
          href={personalInfo.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Linkedin className="w-8 h-8" />
        </a>
        <a 
          href={`mailto:${personalInfo.email}`}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Mail className="w-8 h-8" />
        </a>
      </div>
      
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} {personalInfo.name}.
      </p>
    </div>
  </footer>
);


// --- Main App Component ---

export default function App() {
  return (
    <div className="bg-white text-slate-900 font-sans leading-relaxed antialiased">
      <StyleInjector />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
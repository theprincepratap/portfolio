import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  GraduationCap, 
  Award, 
  FileCheck, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code,
  Trophy,
  BookOpen,
  Sparkles,
  Youtube,
  Globe,
  Database,
  Cpu,
  Sun,
  Moon,
  Instagram,
  CheckCircle2,
  Image as ImageIcon,
  Layout,
  Terminal
} from 'lucide-react';

// --- 3D Space Background (Crimson & Rose Nebula) ---
const SpaceBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const numParticles = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
      }
      update() {
        this.z -= 2; 
        if (this.z <= 0) this.reset();
      }
      draw() {
        const sx = (this.x / this.z) * (canvas.width / 2) + canvas.width / 2;
        const sy = (this.y / this.z) * (canvas.height / 2) + canvas.height / 2;
        const r = Math.max(0, (1 - this.z / canvas.width) * 3);
        
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${1 - this.z / canvas.width})` : `rgba(225, 29, 72, ${1 - this.z / canvas.width})`;
        ctx.fill();
        
        const px = (this.x / this.pz) * (canvas.width / 2) + canvas.width / 2;
        const py = (this.y / this.pz) * (canvas.height / 2) + canvas.height / 2;
        this.pz = this.z;
        
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = isDark ? `rgba(255, 255, 255, 0.1)` : `rgba(225, 29, 72, 0.05)`;
        ctx.stroke();
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < numParticles; i++) particles.push(new Particle());
    };

    const draw = () => {
      ctx.fillStyle = isDark ? '#020617' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
      if (isDark) {
        gradient.addColorStop(0, 'rgba(190, 18, 60, 0.1)'); 
        gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(254, 226, 226, 0.4)'); 
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

const SectionTitle = ({ children, icon: Icon, isDark }) => (
  <div className="flex items-center gap-6 mb-12 relative">
    <div className={`p-4 rounded-2xl border transition-all duration-500 z-10 ${isDark ? 'bg-rose-500/20 border-rose-500/30' : 'bg-red-600 border-red-700 shadow-lg shadow-red-200'}`}>
      <Icon className={`w-8 h-8 ${isDark ? 'text-rose-400' : 'text-white'}`} />
    </div>
    <div className="relative group">
      <div className={`absolute -inset-x-6 -inset-y-2 rounded-2xl transition-all duration-500 -z-10 ${
        isDark ? 'bg-rose-500/10 group-hover:bg-rose-500/20' : 'bg-red-50 group-hover:bg-red-100'
      }`} />
      <h2 className={`text-3xl md:text-5xl font-black transition-colors duration-500 px-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {children}
      </h2>
    </div>
  </div>
);

const Card = ({ children, isDark, className = "" }) => (
  <div className={`group relative p-8 rounded-[2.5rem] transition-all duration-500 backdrop-blur-md border ${
    isDark 
    ? 'bg-slate-900/40 border-slate-800 hover:border-rose-500/50 shadow-2xl shadow-black/40' 
    : 'bg-white/70 border-slate-200 shadow-xl shadow-red-100/30 hover:shadow-2xl hover:border-indigo-300'
  } ${className}`}>
    <div className={`absolute inset-0 transition-opacity duration-500 rounded-[2.5rem] ${
      isDark ? 'bg-gradient-to-br from-rose-500/5 to-transparent' : 'bg-gradient-to-br from-red-50/50 to-transparent'
    } opacity-0 group-hover:opacity-100`} />
    <div className="relative z-10">{children}</div>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const scrollRef = useRef(null);
  const projectScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slide = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const slideProjects = (direction) => {
    if (projectScrollRef.current) {
      const { scrollLeft, clientWidth } = projectScrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      projectScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const userData = {
    name: "Prince Kumar",
    profilePic: "IMG_4648.png", 
    role: "MCA Candidate @ VIT Chennai | ML & Full Stack Developer",
    bio: "I specialize in bridging the gap between Machine Learning and Web Engineering. Currently architecting intelligent applications that leverage deep learning to solve real-world problems. Passionate about end-to-end model deployment and scalable MERN stack solutions.",
    gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=theprincepratap@gmail.com",
    education: [
      {
        degree: "Master of Computer Application (MCA)",
        institution: "Vellore Institute of Technology, Chennai",
        period: "2025 - 2027",
        cgpa: "7.96 CGPA",
        description: "Specializing in End-to-End Model Training, Deep Neural Networks, and Advanced Java. Working on intelligent networking platforms."
      },
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "SNS College Jehanabad, Magadh University",
        period: "2021 - 2024",
        cgpa: "7.89 CGPA",
        description: "Foundations of Computer Science, Operating Systems, and C/C++/Java programming."
      }
    ],
    projects: [
      {
        title: "AI-Powered Partner Matching Engine",
        tech: ["Django REST", "ML", "DL", "TF-IDF"],
        desc: "An AI-driven similarity engine using TF-IDF and Cosine Similarity to automate teammate discovery based on skill compatibility for a base of 500+ students.",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      },
      {
        title: "Local Worker Finder Application",
        tech: ["DSA", "SQL", "Java", "Dijkstra"],
        desc: "High-performance worker ranking system using B+ Trees and Fibonacci Heaps to optimize search latency and request handling with ACID compliance.",
        icon: Database,
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      },
      {
        title: "Neural Image Classification System",
        tech: ["PyTorch", "CNN", "ResNet", "Transfer Learning"],
        desc: "Deep learning image classifier using ResNet50 architecture with transfer learning, achieving 95% accuracy on custom dataset with 10K+ images across 20 categories.",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      },
      {
        title: "Sentiment Analysis NLP Engine",
        tech: ["TensorFlow", "LSTM", "BERT", "NLP"],
        desc: "Advanced sentiment analysis system using BERT transformers and LSTM networks to analyze customer reviews with 92% accuracy on multi-class sentiment detection.",
        icon: Code,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      },
      {
        title: "Real-time Object Detection API",
        tech: ["YOLOv8", "FastAPI", "OpenCV", "Docker"],
        desc: "Deployed YOLO-based object detection REST API processing 30+ FPS with Docker containerization for scalable real-time video analysis in production.",
        icon: Terminal,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      },
      {
        title: "Predictive Analytics Dashboard",
        tech: ["Scikit-learn", "XGBoost", "React", "Flask"],
        desc: "ML-powered forecasting platform with ensemble models (Random Forest, XGBoost) predicting sales trends with interactive React visualization dashboard.",
        icon: Database,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        link: "#"
      }
    ],
    certifications: [
      { 
        name: "Data Analysis", 
        issuer: "Coursera / IBM", 
        date: "2024", 
        level: "Professional",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
      },
      { 
        name: "Django Web Development", 
        issuer: "Udemy", 
        date: "2023", 
        level: "Specialist",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800"
      },
      { 
        name: "Machine Learning Foundations", 
        issuer: "VIT Chennai", 
        date: "2025", 
        level: "Academic",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800"
      },
      { 
        name: "Full Stack MERN", 
        issuer: "FreeCodeCamp", 
        date: "2023", 
        level: "Full",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
      },
      { 
        name: "Cloud Computing Architect", 
        issuer: "AWS", 
        date: "2024", 
        level: "Expert",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
      }
    ],
    skills: ["Python", "TensorFlow", "Scikit-learn", "Django", "MERN Stack", "C++", "Java", "SQL", "Pandas", "Numpy"]
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-rose-500/30 transition-colors duration-700 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
      <SpaceBackground isDark={isDark} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? (isDark ? 'bg-slate-950/90 border-b border-slate-800 shadow-2xl' : 'bg-white/80 border-b border-slate-200 shadow-lg shadow-red-100/20') : 'bg-transparent'
      } backdrop-blur-md py-4`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`text-xl md:text-2xl font-black transition-colors duration-500 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Sparkles className="w-6 h-6 text-red-600" />
            PRINCE<span className="text-red-600">.DEV</span>
          </div>
          <div className="flex items-center gap-3 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Academic', 'Projects', 'Certs', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-bold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-red-600'}`}>{item}</a>
              ))}
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-xl border transition-all duration-500 active:scale-90 ${isDark ? 'bg-slate-900 border-slate-800 text-yellow-400 hover:border-rose-500/50' : 'bg-white border-slate-200 text-red-600 shadow-md'}`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href={userData.gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* Hero Header - Min-height and padding-bottom further reduced to tighten spacing */}
      <header id="about" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-10 ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Currently @ VIT Chennai
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1] flex flex-col items-center">
            <span className={`transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Hello, I'm
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 uppercase flex flex-wrap justify-center gap-2 mt-1">
              <span>Prince</span>
              <span>Kumar</span>
            </span>
          </h1>

          <div className="relative inline-block mb-8">
            <div className={`relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl transition-all duration-500 ${isDark ? 'border-slate-800' : 'border-white'} bg-slate-100`}>
              <img 
                src={userData.profilePic} 
                alt={userData.name} 
                className="w-full h-full object-cover object-top transition-transform duration-500" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=Prince+Kumar&background=e11d48&color=fff&size=256";
                }} 
              />
            </div>
          </div>
          
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{userData.bio}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Linkedin, url: "https://in.linkedin.com/in/thprincepratap?trk=public_profile_browsemap", color: "hover:text-red-600 hover:border-red-600" },
              { icon: Youtube, url: "https://youtube.com/@priprocode", color: "hover:text-red-700 hover:border-red-700" },
              { icon: Instagram, url: "https://www.instagram.com/itsprincepratap", color: "hover:text-rose-600 hover:border-rose-600" },
              { icon: Globe, url: "https://theprincepratap.wordpress.com", color: "hover:text-red-500 hover:border-red-500" }
            ].map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" className={`p-4 rounded-2xl border transition-all duration-300 ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-400 shadow-md'} ${link.color}`} rel="noreferrer"><link.icon className="w-6 h-6" /></a>
            ))}
          </div>

          <div className="mt-8 flex justify-center animate-bounce opacity-40">
            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
          </div>
        </div>
      </header>

      {/* Vertical spacing between sections reduced from 24 to 16 */}
      <main className="max-w-7xl mx-auto px-6 space-y-16 pb-24">
        
        {/* Academic Journey - Space tightened to pt-4 */}
        <section id="academic" className="scroll-mt-32 pt-4">
          <SectionTitle icon={GraduationCap} isDark={isDark}>Academic Records</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.education.map((edu, idx) => (
              <Card key={idx} isDark={isDark}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h3>
                    <p className="text-red-600 font-bold text-sm uppercase tracking-wider mt-1">{edu.institution}</p>
                    
                    <div className={`mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl text-base font-black transition-all duration-500 ${
                      isDark 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                    }`}>
                      <Trophy className="w-5 h-5" /> {edu.cgpa}
                    </div>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-black ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{edu.period}</span>
                </div>
                <p className={`leading-relaxed text-base font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32 relative">
          <div className="flex justify-between items-end mb-8">
            <SectionTitle icon={Layout} isDark={isDark}>Featured Projects</SectionTitle>
            <div className="flex gap-4 mb-10">
              <button onClick={() => slideProjects('left')} className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600 shadow-md'}`}>
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => slideProjects('right')} className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600 shadow-md'}`}>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={projectScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {userData.projects.map((project, idx) => (
              <div key={idx} className="min-w-[350px] md:min-w-[450px] snap-center">
                <Card isDark={isDark} className="flex flex-col p-0 overflow-hidden h-full group/project">
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover/project:scale-110 opacity-80 group-hover/project:opacity-100" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"; }} />
                  <div className="absolute bottom-6 left-8 z-20">
                    <div className={`p-4 rounded-2xl backdrop-blur-md border ${isDark ? 'bg-red-500/20 border-red-500/30 text-red-500' : 'bg-white/90 border-white text-red-600 shadow-xl'}`}>
                      <project.icon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-grow flex flex-col">
                  <h3 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-100'}`}>{t}</span>
                    ))}
                  </div>
                  <p className={`leading-relaxed text-base font-medium mb-8 flex-grow ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{project.desc}</p>
                  <div className="flex items-center gap-4">
                    <button className={`flex-grow py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${isDark ? 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/40' : 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-200'}`}>Live Preview <ExternalLink className="w-4 h-4" /></button>
                    <button className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600'}`}><Github className="w-5 h-5" /></button>
                  </div>
                </div>
              </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications - Horizontal Carousel */}
        <section id="certs" className="scroll-mt-32 relative">
          <div className="flex justify-between items-end mb-8">
            <SectionTitle icon={FileCheck} isDark={isDark}>Certifications</SectionTitle>
            <div className="flex gap-4 mb-10">
              <button onClick={() => slide('left')} className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600 shadow-md'}`}>
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => slide('right')} className={`p-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-red-500' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600 shadow-md'}`}>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {userData.certifications.map((cert, idx) => (
              <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center">
                <Card isDark={isDark} className="flex flex-col p-0 overflow-hidden h-full group/cert">
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                    <img src={cert.image} alt={cert.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/cert:scale-110 opacity-80 group-hover/cert:opacity-100" />
                    <div className="absolute top-4 right-4 z-20">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-red-500/10 text-red-500' : 'bg-red-50 text-red-600'}`}><BookOpen className="w-6 h-6" /></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{cert.date}</span>
                    </div>
                    <h4 className={`text-xl font-black mb-2 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h4>
                    <p className="text-red-600 font-bold text-sm mb-6">{cert.issuer}</p>
                    <button className={`w-full py-3 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${isDark ? 'border-slate-800 text-slate-400 hover:border-red-500 hover:text-white' : 'border-slate-100 text-slate-500 hover:border-red-600 hover:text-red-600'}`}>View Credential <ExternalLink className="w-4 h-4" /></button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32 pb-12">
          <div className={`rounded-[4rem] overflow-hidden relative p-12 md:p-24 shadow-2xl transition-all duration-700 ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-emerald-600 shadow-emerald-900/40'}`}>
            <div className={`absolute top-0 right-0 w-1/2 h-full opacity-10 -skew-x-12 translate-x-1/4 ${isDark ? 'bg-emerald-500' : 'bg-white'}`} />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">Got a Big Idea? <br />Let's Build It.</h2>
                <p className="text-emerald-100 text-xl md:text-2xl font-medium opacity-90 leading-relaxed">I'm always looking for collaborative projects in Machine Learning and Web Architecture.</p>
              </div>
              <a href={userData.gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 px-10 py-8 rounded-[2.5rem] bg-white text-emerald-600 font-black text-xl hover:scale-[1.05] transition-all shadow-2xl min-w-[320px]">
                <div className="flex items-center gap-4"><Mail className="w-8 h-8" /> Gmail Me</div>
                <ChevronDown className="w-6 h-6 -rotate-90 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className={`py-12 border-t ${isDark ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-slate-50'} text-center`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black text-red-600 tracking-tighter uppercase">PRINCE KUMAR</div>
          <p className={`text-sm font-black transition-colors duration-500 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>@2026 Prince Pratap Singh</p>
          <div className="flex gap-6">
            <a href="https://in.linkedin.com/in/thprincepratap?trk=public_profile_browsemap" target="_blank" rel="noreferrer"><Linkedin className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors" /></a>
            <a href="https://youtube.com/@priprocode" target="_blank" rel="noreferrer"><Youtube className="w-6 h-6 cursor-pointer hover:text-red-700 transition-colors" /></a>
            <a href="https://www.instagram.com/itsprincepratap" target="_blank" rel="noreferrer"><Instagram className="w-6 h-6 cursor-pointer hover:text-rose-600 transition-colors" /></a>
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
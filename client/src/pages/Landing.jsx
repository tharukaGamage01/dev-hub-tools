import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes matrix {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        .float { animation: float 6s ease-in-out infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .slide-in { animation: slideIn 0.8s ease-out forwards; }
        .matrix-rain { animation: matrix 10s linear infinite; }
        
        .tool-card {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .tool-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ef4444, #f59e0b);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 4s ease infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      
      
      {/* Matrix rain effect */}
      <div style={styles.matrixContainer}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="matrix-rain"
            style={{
              ...styles.matrixLine,
              left: `${i * 2}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          >
            {Math.random().toString(36).substring(2, 15)}
          </div>
        ))}
      </div>
  
      <div
        
      />
      
      {/* Header */}
      <header style={styles.header} className={isLoaded ? 'slide-in' : ''}>
        <h1 style={styles.logo} className="gradient-text">
          DevToolsHub
        </h1>
        <nav style={styles.nav}>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
          <Link to="/register" style={styles.ctaButton} className="glow">
            Get Started
          </Link>
        </nav>
      </header>
      
      {/* Hero Section */}
      <main style={styles.hero}>
        <div style={styles.heroContent} className={isLoaded ? 'slide-in' : ''}>
          <h2 style={styles.heroTitle} className="gradient-text">
            All Your Development Tools
            <br />
            <span style={styles.heroSubtitle}>In One Dashboard</span>
          </h2>
          <p style={styles.heroDescription}>
            Organize, manage, and access your essential dev tools effortlessly. Built for developers by developers, designed for the future.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register" style={styles.primaryButton} className="glow">
               Create Account
            </Link>
            <Link to="/login" style={styles.secondaryButton}>
              Already have an account
            </Link>
          </div>
        </div>
        
  
      </main>

    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  
  backgroundElements: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1
  },
  
  floatingElement: {
    position: 'absolute',
    fontSize: '2rem',
    opacity: 0.6,
    pointerEvents: 'none'
  },
  
  matrixContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.1
  },
  
  matrixLine: {
    position: 'absolute',
    color: '#00ff00',
    fontSize: '12px',
    fontFamily: 'monospace',
    whiteSpace: 'nowrap'
  },
  
  cursorGlow: {
    position: 'fixed',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 2,
    transition: 'all 0.1s ease'
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'relative',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0
  },
  
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.2)'
    }
  },
  
  ctaButton: {
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    color: '#ffffff',
    padding: '0.7rem 1.5rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    textAlign: 'center', 
    position: 'absolute', 
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    padding: '2rem',
    maxWidth: '800px',
 
  },
  
  heroContent: {
    maxWidth: '800px',
    marginBottom: '3rem'
  },
  
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '900',
    lineHeight: '1.2',
    margin: '0 0 1rem 0'
  },
  
  heroSubtitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700'
  },
  
  heroDescription: {
    fontSize: '1.2rem',
    color: '#cbd5e1',
    margin: '1.5rem 0 2rem 0',
    lineHeight: '1.6'
  },
  
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  
  primaryButton: {
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    transform: 'perspective(1000px) rotateX(0deg)'
  },
  
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  },
  
  toolsShowcase: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  
  toolIcon: {
    width: '120px',
    height: '120px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  toolIconInner: {
    textAlign: 'center'
  },
  
  toolEmoji: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '0.5rem'
  },
  
  toolName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#cbd5e1'
  },
  
  features: {
    padding: '4rem 2rem',
    position: 'relative',
    zIndex: 10,
    background: 'rgba(15, 15, 35, 0.5)',
    backdropFilter: 'blur(10px)'
  },
  
  featuresTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
    margin: '0 0 3rem 0'
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  featureCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid',
    transition: 'all 0.3s ease'
  },
  
  featureIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    margin: '0 auto 1rem auto'
  },
  
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    color: '#ffffff'
  },
  
  featureDesc: {
    color: '#cbd5e1',
    lineHeight: '1.6',
    margin: 0
  },
  
  cta: {
    padding: '4rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
    background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
  },
  
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 1rem 0'
  },
  
  ctaDescription: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    margin: '0 0 2rem 0'
  },
  
  ctaLargeButton: {
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    color: '#ffffff',
    padding: '1.2rem 3rem',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.2rem',
    display: 'inline-block',
    transition: 'all 0.3s ease'
  },
  
  footer: {
    textAlign: 'center',
    padding: '2rem',
    position: 'relative',
    zIndex: 10,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  
  footerText: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: 0
  }
};
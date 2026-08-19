import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const BackgroundAurora = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.div 
      animate={{ 
        opacity: [0.1, 0.15, 0.1],
        scale: [1, 1.05, 1],
        rotate: [0, 5, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px] transition-colors duration-300 will-change-transform" 
    />
    <motion.div 
      animate={{ 
        opacity: [0.05, 0.1, 0.05],
        scale: [1, 1.1, 1],
        x: [0, -20, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-500/5 rounded-full blur-[100px] transition-colors duration-300 will-change-transform" 
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary),transparent)] opacity-[0.02] transition-colors duration-300" />
    
    {/* Subtle floating particles */}
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120, 0],
            x: [0, i % 2 === 0 ? 30 : -30, 0],
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${30 + i * 8}%`
          }}
        />
      ))}
    </div>
  </div>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <BackgroundAurora />

      {/* Decorative Borders for Light Mode */}
      <div className="fixed inset-8 border border-[var(--landing-decoration)] pointer-events-none -z-5 rounded-[3rem] hidden md:block" />
      <div className="fixed top-0 bottom-0 left-[15%] w-px bg-[var(--landing-decoration)] pointer-events-none -z-5 hidden lg:block" />
      <div className="fixed top-0 bottom-0 right-[15%] w-px bg-[var(--landing-decoration)] pointer-events-none -z-5 hidden lg:block" />

      <main className="flex-1 flex flex-col items-center justify-between max-w-4xl mx-auto w-full px-6 py-12 md:py-24">
        {/* Top Spacer */}
        <div className="h-12" />

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="inline-flex items-center space-x-2 bg-primary/5 dark:bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 shadow-sm backdrop-blur-sm transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse transition-colors duration-300" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-primary transition-colors duration-300">Caracterización</span>
            </motion.div>
            
            <h1 className="font-black tracking-tighter uppercase flex flex-col items-center w-full">
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1 }}
                className="text-[min(15vw,90px)] sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.85] text-primary whitespace-nowrap transition-colors duration-300"
              >
                ¡MIRA VÉ!
              </motion.span>
              <motion.span 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-[min(9vw,45px)] sm:text-4xl md:text-5xl lg:text-[54px] leading-[0.9] text-muted-foreground/90 italic whitespace-nowrap mt-1 md:mt-2 transition-colors duration-300"
              >
                JUVENTUDES CALI
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-xs"
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="w-full h-16 md:h-20 rounded-full text-lg md:text-xl font-black shadow-2xl hover:shadow-primary/20 transition-all bg-primary text-white border-0"
                onClick={() => navigate('/encuesta')}
              >
                COMENZAR <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimalist Footer */}
        <footer className="w-full py-8 flex flex-col items-center gap-4 opacity-20">
          <div className="flex items-center space-x-6 text-[8px] md:text-[10px] uppercase font-black tracking-[0.4em]">
            <span>2026</span>
            <div className="w-1 h-1 bg-foreground rounded-full" />
            <button onClick={() => navigate('/admin/login')} className="hover:text-primary transition-colors">Admin Portal</button>
            <div className="w-1 h-1 bg-foreground rounded-full" />
            <span>Ley 1581</span>
          </div>
        </footer>
      </main>
    </div>
  );
}


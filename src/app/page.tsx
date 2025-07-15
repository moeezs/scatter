'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState(getFormattedDate());
  const [time, setTime] = useState(getFormattedTime());
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    const interval = setInterval(() => {
      setDate(getFormattedDate());
      setTime(getFormattedTime());
    }, 1000);
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setCursor(prev => {
        const dx = mouse.x - prev.x;
        const dy = mouse.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [mouse.x, mouse.y]);

  const projects = [
    {
      title: 'Reelax',
      description: 'A relaxing video streaming experience',
      image: '/paper.png',
      link: '/reelax',
    },
    {
      title: 'Coming Soon',
      description: 'Stay tuned for updates.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Exciting things are coming.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Watch this space.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Something cool is brewing.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'More soon!',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Stay tuned.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Almost here.',
      image: '/paper.png',
      link: '#',
    },
    {
      title: 'Coming Soon',
      description: 'Launching soon.',
      image: '/paper.png',
      link: '#',
    },
  ];

  // Helper to detect mobile
  const isMobile = windowSize.width < 700;
  const tileSize = isMobile ? 'w-36 h-24' : 'w-56 h-36';
  const tileGap = isMobile ? 'gap-4' : 'gap-8';
  const rotations = [-4, 5, -2, 6, -5, 3, -3, 4, -4];

  return (
    <main
      className="relative min-h-screen w-full bg-[#f7efe7] overflow-hidden font-sans flex flex-col"
      style={{ cursor: isMobile ? 'default' : 'none' }}
    >
      <style>{`
        ${!isMobile ? '* { cursor: none !important; } input, textarea, select { cursor: none !important; }' : ''}
      `}</style>
      {!isMobile && (
        <Image
          src="/plane.cur"
          alt="cursor"
          width={25}
          height={25}
          style={{
            position: 'fixed',
            left: cursor.x - 11,
            top: cursor.y - 11,
            pointerEvents: 'none',
            zIndex: 10000,
            userSelect: 'none',
            transition: 'filter 0.1s',
          }}
          draggable={false}
          priority
          unoptimized
        />
      )}
      <div
        className={`pt-6 pl-4 flex flex-col items-start gap-0 select-none ${isMobile ? 'pb-2' : ''}`}
        style={{fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1rem', color: '#18181b', letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 1.1}}
      >
        <span>{date}</span>
        <span style={{fontWeight: 400, fontSize: '1.5rem', marginTop: 2}}>{time}</span>
      </div>
      <div className={`w-full flex justify-center ${isMobile ? 'mt-6 mb-4' : 'mt-2 mb-2'}`}>
        <h1 className="text-3xl font-extrabold tracking-tight uppercase text-[#18181b]" style={{fontFamily: 'monospace', letterSpacing: '-0.04em'}}>Scatter</h1>
      </div>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#f7efe7] text-black text-xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="animate-pulse">messing up the scatter...</p>
          </motion.div>
        )}
      </AnimatePresence>
      {isLoaded && (
        <div className={`flex-1 flex flex-col items-center justify-center pb-8 ${isMobile ? 'px-2 sm:px-4 mt-2' : 'px-2 sm:px-8 mt-0'}`}>
          {!isMobile ? (
            <div className={`grid grid-cols-3 ${tileGap} place-items-center`}>
              {projects.map((project, i) => (
                <motion.a
                  key={i}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.92, rotate: rotations[i % rotations.length] * 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
                  transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
                  whileHover={{ scale: 1.03, rotate: 0, borderColor: '#ff0055', transition: { duration: 0.09 } }}
                  className={`relative flex flex-col items-center justify-end border-4 border-[#18181b] box-content ${tileSize} bg-white text-lg font-mono font-bold uppercase select-none cursor-pointer shadow-[8px_8px_0_#18181b] transition-all duration-150 overflow-hidden`}
                  style={{
                    borderRadius: 0,
                    borderColor: i % 3 === 1 ? '#ff0055' : '#18181b',
                    transform: `rotate(${rotations[i % rotations.length]}deg)`
                  }}
                >
                  <Image src={project.image} alt={project.title} fill className="object-cover opacity-40" />
                  <div className="relative z-10 w-full flex flex-col items-center justify-center px-2 py-2 bg-white/70">
                    <span className="font-mono font-bold text-base sm:text-lg text-[#18181b] uppercase text-center">
                      {project.title}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-2 grid-rows-5 ${tileGap} w-full justify-items-center gap-y-6`}>
              {projects.map((project, i) => (
                i === 8 ? (
                  <div key={i} className="col-span-2 flex justify-center w-full">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.92, rotate: rotations[i % rotations.length] * 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
                      transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
                      whileHover={{ scale: 1.03, rotate: 0, borderColor: '#ff0055', transition: { duration: 0.09 } }}
                      className={`relative flex flex-col items-center justify-end border-4 border-[#18181b] box-content ${tileSize} bg-white text-base font-mono font-bold uppercase select-none cursor-pointer shadow-[8px_8px_0_#18181b] transition-all duration-150 overflow-hidden`}
                      style={{
                        borderRadius: 0,
                        borderColor: i % 3 === 1 ? '#ff0055' : '#18181b',
                        transform: `rotate(${rotations[i % rotations.length]}deg)`
                      }}
                    >
                      <Image src={project.image} alt={project.title} fill className="object-cover opacity-40" />
                      <div className="relative z-10 w-full flex flex-col items-center justify-center px-2 py-2 bg-white/70">
                        <span className="font-mono font-bold text-base text-[#18181b] uppercase text-center">
                          {project.title}
                        </span>
                      </div>
                    </motion.a>
                  </div>
                ) : (
                  <motion.a
                    key={i}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.92, rotate: rotations[i % rotations.length] * 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
                    transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
                    whileHover={{ scale: 1.03, rotate: 0, borderColor: '#ff0055', transition: { duration: 0.09 } }}
                    className={`relative flex flex-col items-center justify-end border-4 border-[#18181b] box-content ${tileSize} bg-white text-base font-mono font-bold uppercase select-none cursor-pointer shadow-[8px_8px_0_#18181b] transition-all duration-150 overflow-hidden`}
                    style={{
                      borderRadius: 0,
                      borderColor: i % 3 === 1 ? '#ff0055' : '#18181b',
                      transform: `rotate(${rotations[i % rotations.length]}deg)`
                    }}
                  >
                    <Image src={project.image} alt={project.title} fill className="object-cover opacity-40" />
                    <div className="relative z-10 w-full flex flex-col items-center justify-center px-2 py-2 bg-white/70">
                      <span className="font-mono font-bold text-base text-[#18181b] uppercase text-center">
                        {project.title}
                      </span>
                    </div>
                  </motion.a>
                )
              ))}
            </div>
          )}
        
        <AnimatePresence>
            {isLoaded && (
            <motion.a
              href="https://www.moeezs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 group"
              style={{ pointerEvents: 'auto' }}
              initial={{ y: 200, x: 120, rotate: -30, opacity: 0 }}
              animate={{ y: -20, x: -20, rotate: -8, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.7, delay: 0.5 }}
            >
              <div className="relative flex flex-col items-center">
              <span
                className={`
                bg-white border-4 border-[#18181b] shadow-[8px_8px_0_#18181b] rotate-[-8deg] flex items-center justify-center transition-transform group-hover:rotate-0 group-hover:scale-105
                ${windowSize.width < 700 ? 'w-12 h-12' : 'w-16 h-16'}
                `}
              >
                <span className={`font-mono font-bold text-[#18181b] select-none ${windowSize.width < 700 ? 'text-lg' : 'text-2xl'}`}>ams</span>
              </span>
              </div>
            </motion.a>
            )}
        </AnimatePresence>
    </div>
  )
} 

    </main>
  );
}
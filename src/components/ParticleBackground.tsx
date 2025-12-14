'use client';

import { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle colors
        const colors = [
            'rgba(59, 130, 246, 0.6)',   // Blue
            'rgba(168, 85, 247, 0.6)',   // Purple
            'rgba(245, 158, 11, 0.6)',   // Orange
            'rgba(16, 185, 129, 0.6)',   // Green
            'rgba(236, 72, 153, 0.6)',   // Pink
        ];

        // Create particles
        const particles: Particle[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;
        let mouseActive = false;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseActive = true;
        };

        const handleMouseLeave = () => {
            mouseActive = false;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction
                if (mouseActive) {
                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        particle.vx -= (dx / distance) * force * 0.1;
                        particle.vy -= (dy / distance) * force * 0.1;
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Draw connections
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

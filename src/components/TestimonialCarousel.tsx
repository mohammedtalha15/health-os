'use client';

import { motion } from 'framer-motion';
import styles from './TestimonialCarousel.module.css';
import { useState, useEffect } from 'react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Health Enthusiast',
        avatar: '👩‍⚕️',
        rating: 5,
        text: 'Health OS transformed how I understand my lab results. The AI explanations are incredibly clear and helpful!',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Diabetes Patient',
        avatar: '👨‍💼',
        rating: 5,
        text: 'Tracking my glucose levels over time has never been easier. The trend detection caught issues before my doctor did.',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Busy Parent',
        avatar: '👩‍👧',
        rating: 5,
        text: 'Managing health records for my whole family in one place is a game-changer. Love the emergency snapshot feature!',
    },
    {
        id: 4,
        name: 'David Park',
        role: 'Fitness Coach',
        avatar: '🏋️',
        rating: 5,
        text: 'The visualizations help me track my clients\' progress. Health OS makes complex data simple and actionable.',
    },
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Safety check for empty testimonials
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
        }),
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselContainer}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className={styles.testimonialCard}
                >
                    <div className={styles.rating}>
                        {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                            <span key={i} className={styles.star}>★</span>
                        ))}
                    </div>
                    <p className={styles.testimonialText}>"{testimonials[currentIndex].text}"</p>
                    <div className={styles.author}>
                        <div className={styles.avatar}>{testimonials[currentIndex].avatar}</div>
                        <div className={styles.authorInfo}>
                            <div className={styles.authorName}>{testimonials[currentIndex].name}</div>
                            <div className={styles.authorRole}>{testimonials[currentIndex].role}</div>
                        </div>
                    </div>
                </motion.div>

                <button
                    className={`${styles.navButton} ${styles.navButtonPrev}`}
                    onClick={handlePrevious}
                    aria-label="Previous testimonial"
                >
                    ‹
                </button>
                <button
                    className={`${styles.navButton} ${styles.navButtonNext}`}
                    onClick={handleNext}
                    aria-label="Next testimonial"
                >
                    ›
                </button>
            </div>

            <div className={styles.indicators}>
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

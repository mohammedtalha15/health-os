// Motion Tokens - Animation Design System for Health OS

export const motionTokens = {
    // Durations (ms)
    duration: {
        ultraShort: 150,
        short: 250,
        medium: 400,
        long: 600,
        extraLong: 1000,
    },

    // Easing functions
    easing: {
        easeOutCirc: [0, 0.55, 0.45, 1],
        easeOutExpo: [0.19, 1, 0.22, 1],
        easeInOutCubic: [0.65, 0, 0.35, 1],
        spring: { type: "spring", stiffness: 300, damping: 30 },
        smoothSpring: { type: "spring", stiffness: 100, damping: 20 },
        bounceSpring: { type: "spring", stiffness: 400, damping: 10 },
    },

    // Opacity transitions
    opacity: {
        fadeIn: { opacity: [0, 1] },
        fadeOut: { opacity: [1, 0] },
        fadeInUp: { opacity: [0, 1], y: [20, 0] },
        fadeInDown: { opacity: [0, 1], y: [-20, 0] },
    },

    // Scale transitions
    scale: {
        scaleIn: { scale: [0.9, 1], opacity: [0, 1] },
        scaleOut: { scale: [1, 0.9], opacity: [1, 0] },
        pulse: { scale: [1, 1.05, 1] },
        breathe: { scale: [1, 1.02, 1] },
    },

    // Blur effects
    blur: {
        light: "blur(8px)",
        medium: "blur(16px)",
        heavy: "blur(24px)",
        glass: "blur(20px) saturate(180%)",
    },

    // Z-layers for 3D UI
    zLayers: {
        background: -1,
        base: 0,
        elevated: 10,
        dropdown: 100,
        modal: 1000,
        tooltip: 2000,
    },

    // Parallax ratios
    parallax: {
        subtle: 0.02,
        medium: 0.05,
        strong: 0.1,
    },

    // Stagger delays for list animations
    stagger: {
        ultraFast: 0.05,
        fast: 0.1,
        medium: 0.15,
        slow: 0.2,
    },
};

// Preset animation variants
export const animationPresets = {
    // Fade in from bottom
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.4, ease: motionTokens.easing.easeOutExpo },
    },

    // Scale and fade
    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.3, ease: motionTokens.easing.easeOutCirc },
    },

    // Slide from right
    slideInRight: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
        transition: { duration: 0.4, ease: motionTokens.easing.easeOutExpo },
    },

    // Morph card
    morphCard: {
        initial: { borderRadius: 24, scale: 1 },
        hover: {
            borderRadius: 16,
            scale: 1.02,
            transition: { duration: 0.3, ease: motionTokens.easing.smoothSpring },
        },
        tap: { scale: 0.98 },
    },

    // Breathing animation
    breathe: {
        animate: {
            scale: [1, 1.02, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    },

    // Glow pulse
    glowPulse: {
        animate: {
            boxShadow: [
                "0 0 20px rgba(37, 99, 235, 0.3)",
                "0 0 40px rgba(37, 99, 235, 0.6)",
                "0 0 20px rgba(37, 99, 235, 0.3)",
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    },

    // Stagger children
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: motionTokens.stagger.medium,
            },
        },
    },

    // List item
    listItem: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    },
};

// Severity-based animations
export const severityAnimations = {
    green: {
        borderColor: "rgba(16, 185, 129, 0.3)",
        boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
    },
    yellow: {
        borderColor: "rgba(245, 158, 11, 0.3)",
        boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
        animate: {
            boxShadow: [
                "0 0 20px rgba(245, 158, 11, 0.2)",
                "0 0 30px rgba(245, 158, 11, 0.4)",
                "0 0 20px rgba(245, 158, 11, 0.2)",
            ],
            transition: { duration: 2, repeat: Infinity },
        },
    },
    red: {
        borderColor: "rgba(239, 68, 68, 0.5)",
        boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
        animate: {
            boxShadow: [
                "0 0 30px rgba(239, 68, 68, 0.3)",
                "0 0 50px rgba(239, 68, 68, 0.6)",
                "0 0 30px rgba(239, 68, 68, 0.3)",
            ],
            transition: { duration: 1.5, repeat: Infinity },
        },
    },
};

export default motionTokens;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './AnimatedUpload.module.css';
import { animationPresets } from '@/lib/motion';

interface AnimatedUploadProps {
    onUpload: (file: File) => Promise<void>;
    profileId: number;
}

export default function AnimatedUpload({ onUpload, profileId }: AnimatedUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setUploadedFile(file);
        setUploading(true);
        setProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            await onUpload(file);
            setProgress(100);
            setTimeout(() => {
                setUploading(false);
                setProgress(0);
            }, 1500);
        } catch (error) {
            console.error('Upload failed:', error);
            setUploading(false);
            setProgress(0);
        } finally {
            clearInterval(interval);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
        },
        maxFiles: 1,
        disabled: uploading,
    });

    return (
        <div className={styles.container}>
            <motion.div
                {...getRootProps()}
                className={styles.dropzone}
                data-active={isDragActive}
                data-uploading={uploading}
                variants={animationPresets.morphCard}
                whileHover={!uploading ? "hover" : undefined}
                whileTap={!uploading ? "tap" : undefined}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!uploading ? (
                        <motion.div
                            key="idle"
                            className={styles.idleState}
                            {...animationPresets.fadeInUp}
                        >
                            <motion.div
                                className={styles.uploadIcon}
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                                    <path
                                        d="M32 20V44M20 32L32 20L44 32"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.div>

                            <h3>
                                {isDragActive
                                    ? 'Drop your file here'
                                    : 'Drag & drop your medical report'}
                            </h3>
                            <p>or click to browse</p>
                            <div className={styles.supportedFormats}>
                                <span>PDF</span>
                                <span>JPG</span>
                                <span>PNG</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="uploading"
                            className={styles.uploadingState}
                            {...animationPresets.scaleIn}
                        >
                            <motion.div
                                className={styles.processingIcon}
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeDasharray="50 150"
                                        opacity="0.3"
                                    />
                                </svg>
                            </motion.div>

                            <h3>Processing your report...</h3>
                            <p>{uploadedFile?.name}</p>

                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <span className={styles.progressText}>{progress}%</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {progress === 100 && (
                <motion.div
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <span className={styles.successIcon}>✓</span>
                    Upload complete! Processing report...
                </motion.div>
            )}
        </div>
    );
}

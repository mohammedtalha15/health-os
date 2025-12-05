'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import styles from './upload.module.css';

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...droppedFiles]);
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);

        // Simulate upload - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setUploading(false);
        router.push('/dashboard');
    };

    return (
        <>
            <Header />
            <main className={styles.uploadPage}>
                <div className="container container-narrow">
                    <div className={styles.uploadHeader}>
                        <h1 className="fade-in">Upload Your Medical Report</h1>
                        <p className="fade-in">
                            Upload any medical file - lab reports, prescriptions, discharge summaries, or images.
                            <br />
                            We'll analyze it and provide clear insights in seconds.
                        </p>
                    </div>

                    <div
                        className={`${styles.uploadZone} ${isDragging ? styles.dragging : ''} fade-in`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className={styles.uploadIcon}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <rect width="64" height="64" rx="16" fill="url(#upload-gradient)" opacity="0.1" />
                                <path
                                    d="M32 20V44M20 32H44M32 20L24 28M32 20L40 28"
                                    stroke="url(#upload-gradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <defs>
                                    <linearGradient id="upload-gradient" x1="0" y1="0" x2="64" y2="64">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <h3>Drag and drop your files here</h3>
                        <p>or</p>

                        <label htmlFor="file-input" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Browse Files
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileSelect}
                            className={styles.fileInput}
                        />

                        <div className={styles.supportedFormats}>
                            <span>Supported formats:</span> PDF, JPG, PNG, DOC, DOCX
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className={styles.fileList}>
                            <h3>Selected Files ({files.length})</h3>
                            {files.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <div className={styles.fileInfo}>
                                        <div className={styles.fileIcon}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={styles.fileName}>{file.name}</div>
                                            <div className={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</div>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFile(index)} className={styles.removeBtn}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className={`btn btn-primary btn-large ${styles.uploadBtn}`}
                            >
                                {uploading ? (
                                    <>
                                        <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M10 14V6M10 6L6 10M10 6L14 10M3 16H17"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

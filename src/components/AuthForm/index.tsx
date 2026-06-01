"use client";

import { AlertCircle, LoaderCircle } from 'lucide-react';
import styles from './AuthForm.module.scss';
import logo from '../../../public/fipe-logo.svg'
import Image from 'next/image';


interface AuthFormProps {
    title?: string;
    subtitle?: string;
    cardTitle: string;
    cardSubtitle: string;
    status: { type: 'error' | 'success'; message: string } | null;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
    submitText: string;
    isCaptchaVerified?: boolean;
    cooldown?: number;
}

export default function AuthScreenShell({
    title, subtitle, cardTitle, cardSubtitle, status,
    loading, onSubmit, children, submitText, isCaptchaVerified, cooldown = 0
}: AuthFormProps) {
    const isButtonDisabled = loading || isCaptchaVerified === false || cooldown > 0;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.authWrapper}>
                <header className={styles.header}>
                    <div className={styles.logoContainer}>
                        <Image src={logo} className={styles.logoIcon} alt='FIPE Radar logo' />
                    </div>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </header>

                <main className={styles.authCard}>
                    <div className={styles.cardHeader}>
                        <h2>{cardTitle}</h2>
                        <p>{cardSubtitle}</p>
                    </div>

                    <div className={styles.cardContent}>
                        {status && (
                            <div className={`${styles.alert} ${status.type === 'error' ? styles.error : styles.success}`}>
                                <AlertCircle size={18} />
                                <span>{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className={styles.authForm}>
                            {children}
                            <button type="submit" className={styles.submitBtn} disabled={isButtonDisabled}>
                                {loading ? (
                                    <LoaderCircle className={styles.spinner} size={20} />
                                ) : isCaptchaVerified === false && cooldown === 0 ? (
                                    <span>Verificando segurança...</span>
                                ) : (
                                    submitText
                                )}
                            </button>
                        </form>

                    </div>
                </main>
            </div>
        </div>
    );
}
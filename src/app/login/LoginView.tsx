"use client";

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import styles from '../../components/AuthForm/AuthForm.module.scss';
import AuthForm from '@/components/AuthForm';
import { getErrorMessage } from '@/utils/authErrors';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextRoute = useMemo(() => searchParams.get('redirect') || '/', [searchParams]);
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (formData.password.length < 6) {
            setStatus({ type: 'error', message: 'A senha deve ter pelo menos 6 caracteres.' });
            return;
        }
        setLoading(true);

        try {
            const { email, password } = formData;
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                throw new Error(getErrorMessage(error));
            }

            setStatus({ type: 'success', message: 'Acesso autorizado! Redirecionando...' });

            router.push(nextRoute);
            router.refresh();

        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const callbackUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(nextRoute)}`;

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: callbackUrl,
                queryParams: { access_type: 'offline', prompt: 'select_account' },
            },
        });
    };

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setStatus({ type: 'error', message: 'Digite seu e-mail no campo acima.' });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
            });

            if (error) throw error;

            setStatus({ type: 'success', message: 'Link de recuperação enviado para o seu e-mail!' });
        } catch (err: any) {
            setStatus({ type: 'error', message: getErrorMessage(err) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            title="FIPE Radar" subtitle="Faça login para continuar"
            cardTitle="Entrar" cardSubtitle="Digite suas credenciais"
            loading={loading} status={status} onSubmit={handleSignIn}
            submitText="Acessar Conta"
        >
            <div className={styles.inputGroup}>
                <label>E-mail</label>
                <div className={styles.inputRelative}>
                    <Mail className={styles.fieldIcon} size={16} />
                    <input
                        type="email"
                        required
                        placeholder="E-mail"
                        autoComplete="username"
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
            </div>
            <div className={styles.inputGroup}>

                <div className={styles.linkResetPassword}>
                    <label>Senha</label>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className={styles.forgotLink}
                        disabled={loading}
                    >
                        Esqueci minha senha
                    </button>
                </div>
                <div className={styles.inputRelative}>
                    <Lock className={styles.fieldIcon} size={16} />
                    <input
                        type={showPassword ? "text" : "password"}
                        required placeholder="•••••••••"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })} />

                    <button type="button" className={styles.toggleVisibility} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className={styles.divider}>
                    <span>ou continue com</span>
                </div>

                <button
                    type="button"
                    className={styles.googleBtn}
                    onClick={handleGoogleLogin}
                >
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continuar com Google
                </button>

            </div>
            <div className={styles.footerLinks}>
                <span>Não tem uma conta? </span>
                <Link href="/cadastro" className={styles.link}>Cadastre-se</Link>
            </div>
        </AuthForm>
    );
}
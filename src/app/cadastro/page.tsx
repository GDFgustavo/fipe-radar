"use client";

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import styles from '../../components/AuthForm/AuthForm.module.scss';
import { useSearchParams } from 'next/navigation';
import { getErrorMessage } from '@/utils/authErrors';

export default function CadastroPage() {
    const supabase = createClient();
    const searchParams = useSearchParams()
    const nextRoute = useMemo(() => searchParams.get('redirect') || '/', [searchParams]);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'As senhas não coincidem.' });
            return;
        }

        setLoading(true);
        const callbackUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(nextRoute)}`;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: callbackUrl
                }
            });

            if (error) {
                throw new Error(getErrorMessage(error));
            }

            if (data?.user?.identities?.length === 0) {
                throw new Error(getErrorMessage("User already registered"));
            }

            setStatus({ type: 'success', message: 'Conta criada! Verifique seu e-mail.' });
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally { setLoading(false); }
    };

    return (
        <AuthForm
            title="FIPE Radar" subtitle="Crie sua conta gratuita"
            cardTitle="Criar conta" cardSubtitle="Preencha os dados abaixo"
            loading={loading} status={status} onSubmit={handleSignUp}
            submitText="Criar conta agora"
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
                <label>Senha</label>
                <div className={styles.inputRelative}>
                    <Lock className={styles.fieldIcon} size={16} />
                    <input
                        type={showPassword ? "text" : "password"}
                        required placeholder="Mínimo 6 caracteres"
                        autoComplete="new-password" value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })} />

                    <button type="button" className={styles.toggleVisibility} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Confirmar Senha</label>
                <div className={styles.inputRelative}>
                    <Lock className={styles.fieldIcon} size={16} />
                    <input
                        type={showPassword ? "text" : "password"}
                        required placeholder="Repita sua senha"
                        autoComplete="new-password" value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                </div>
            </div>

            <div className={styles.footerLinks}>
                <span>Já possui cadastro? </span>
                <Link href="/login" className={styles.link}>Faça Login</Link>
            </div>
        </AuthForm>
    );
}
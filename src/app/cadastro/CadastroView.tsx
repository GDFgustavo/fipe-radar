"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

import AuthForm from '@/components/AuthForm';

import { createClient } from '@/utils/supabase/client';
import { getErrorMessage } from '@/utils/authErrors';
import styles from '../../components/AuthForm/AuthForm.module.scss';

export default function CadastroView() {
    const supabase = createClient();
    const searchParams = useSearchParams();
    const nextRoute = useMemo(() => searchParams.get('redirect') || '/', [searchParams]);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(0);
    const [captchaKey, setCaptchaKey] = useState(0);
    const tokenRef = useRef<string | null>(null);

    useEffect(() => {
        if (cooldown === 0) return;

        const timer = setInterval(() => {
            setCooldown((current) => current - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

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

        if (!captchaToken) {
            alert("Por favor, aguarde a validação do CAPTCHA.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'As senhas não coincidem.' });
            return;
        }
        setLoading(true);
        const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextRoute)}`;

        try {
            let token = tokenRef.current;

            if (!token) {
                for (let i = 0; i < 40; i++) {
                    await new Promise(resolve => setTimeout(resolve, 150));

                    if (tokenRef.current) {
                        token = tokenRef.current;
                        break;
                    }
                }
            }

            if (!token) {
                throw new Error('Falha na verificação de segurança. Por favor, tente novamente.');
            }

            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    captchaToken: token,
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
            setCaptchaKey(prev => prev + 1);
            setCaptchaToken(null);
            tokenRef.current = null;
        } finally {
            setLoading(false);
            setCooldown(60);
        }
    };

    const loginUrl = nextRoute !== '/'
        ? `/login?redirect=${encodeURIComponent(nextRoute)}`
        : "/login";

    return (
        <>
            <AuthForm
                title="FIPE Radar" subtitle="Crie sua conta gratuita"
                cardTitle="Criar conta" cardSubtitle="Preencha os dados abaixo"
                loading={loading} status={status} onSubmit={handleSignUp}
                submitText={cooldown > 0 ? `Aguarde ${cooldown}s` : "Criar conta agora"}
                isCaptchaVerified={true}
                cooldown={cooldown}
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
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Senha</label>
                    <div className={styles.inputRelative}>
                        <Lock className={styles.fieldIcon} size={16} />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Mínimo 6 caracteres"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />

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
                            required
                            placeholder="Repita sua senha"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.footerLinks}>
                    <span>Já possui cadastro? </span>
                    <Link href={loginUrl} className={styles.link}>Faça Login</Link>
                </div>
            </AuthForm>

            <div className={styles.containerCaptcha}>
                <Turnstile
                    key={captchaKey}
                    siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => {
                        setCaptchaToken(token);
                        tokenRef.current = token;
                    }}
                    onExpire={() => {
                        setCaptchaToken(null);
                        tokenRef.current = null;
                    }}
                    options={{ appearance: "interaction-only" }}
                />
            </div>
        </>
    );
}
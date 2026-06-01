"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import AuthForm from '@/components/AuthForm';
import styles from '../../components/AuthForm/AuthForm.module.scss';
import { Lock, Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "@/utils/authErrors";

export default function ResetPassword() {
    const supabase = createClient();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const [isVerifiedByUrl] = useState(() => {
        if (typeof window !== 'undefined') {
            return new URLSearchParams(window.location.search).get('verified') === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (isVerifiedByUrl) {
            const newRelativePathQuery = window.location.pathname;
            window.history.replaceState(null, '', newRelativePathQuery);
        }
    }, [isVerifiedByUrl]);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // 1. Pega o usuário logado (o link do e-mail fez isso por você)
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setStatus({ type: 'error', message: 'Sessão inválida ou expirada.' });
            setLoading(false);
            return;
        }

        if (!user.recovery_sent_at) {
            setStatus({ type: 'error', message: 'Por favor, use o link enviado ao seu e-mail.' });
            setLoading(false);
            return;
        }

        const recoveryTime = new Date(user.recovery_sent_at).getTime();
        const now = new Date().getTime();
        const diffInMinutes = (now - recoveryTime) / 1000 / 60;

        if (diffInMinutes > 20) {
            setStatus({ type: 'error', message: 'Este link de recuperação expirou. Solicite um novo.' });
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setStatus({ type: 'error', message: getErrorMessage(error) });
            setLoading(false);
        } else {
            await supabase.auth.signOut();
            setStatus({ type: 'success', message: 'Senha alterada com sucesso! Redirecionando...' });
            setTimeout(() => router.push('/login'), 2500);
        }
    };

    return (
        <AuthForm cardTitle="Configure uma nova senha" cardSubtitle="Sua senha deve ser diferente da anterior." submitText={loading ? "Processando..." : "Confirmar Nova Senha"} loading={loading} status={status} onSubmit={handleUpdatePassword}>
            <div className={styles.inputGroup}>
                <label>Nova Senha</label>
                <div className={styles.inputRelative}>
                    <Lock className={styles.fieldIcon} size={16} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button type="button" className={styles.toggleVisibility} onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>
        </AuthForm>
    );
}
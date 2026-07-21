"use client"

import { useState, useEffect } from "react";
import { Car, Target, Mail, TrendingUp, TrendingDown } from "lucide-react";
import { NumericFormat } from "react-number-format";

import { VehicleSelector } from "@/components/VehicleSelector";
import { Button } from "@/components/Button";
import { ApiErrorMessage } from "@/components/ApiErrorMensage";
import Modal from "@/components/Modal";

import { useMonitoringForm } from "@/hooks/useMonitoringForm";
import { createClient } from "@/utils/supabase/client";
import styles from './Monitorar.module.scss';

function MonitoringForm({ user, onRequireAuth }: { user: any; onRequireAuth: () => void }) {
    const {
        fipe, email, priceTrend, setPriceTrend,
        targetPrice, setTargetPrice, loading, statusMsg,
        handleCreateMonitoring, MIN_VALUE
    } = useMonitoringForm(user, onRequireAuth);

    return (
        <>
            {fipe.hasError && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <ApiErrorMessage onRetry={fipe.refetchAll} onDismiss={fipe.dismissError} />
                </div>
            )}

            <div className={styles.cardSubtitle}>
                <div className={styles.icon}><Car size={16} /></div>
                <h2>Detalhes do veículo</h2>
            </div>

            <VehicleSelector {...fipe} />

            <div className={styles.monitorGrid}>
                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <div className={styles.icon}><Target size={16} /></div>
                        <h2>Preço alvo</h2>
                    </div>
                    <label className={styles.label}>Preço alvo (Mínimo: R$ 1.000)</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.prefix}>R$</span>
                        <NumericFormat
                            value={targetPrice}
                            onValueChange={(values) => setTargetPrice(Number(values.value))}
                            onBlur={() => targetPrice < MIN_VALUE && setTargetPrice(MIN_VALUE)}
                            thousandSeparator="." decimalSeparator="," decimalScale={0} allowNegative={false}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Notificar quando</label>
                    <div className={styles.trendButtons}>
                        <button
                            type="button"
                            className={`${styles.trendButton} ${priceTrend === "up" ? styles.trendUp : ""}`}
                            onClick={() => setPriceTrend("up")}
                        >
                            <TrendingUp size={16} /> Aumentar preço
                        </button>
                        <button
                            type="button"
                            className={`${styles.trendButton} ${priceTrend === "down" ? styles.trendDown : ""}`}
                            onClick={() => setPriceTrend("down")}
                        >
                            <TrendingDown size={16} /> Diminuir preço
                        </button>
                    </div>
                </div>

                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <div className={styles.icon}><Mail size={16} /></div>
                        <h2>Endereço eletrônico</h2>
                    </div>
                    <label className={styles.label}>Email</label>
                    {user ? (
                        <>
                            <input
                                type="email" value={email}
                                placeholder="Insira seu email" className={styles.input} disabled
                            />
                        </>
                    ) : (
                        <input
                            type="email"
                            placeholder="Vinculado ao e-mail da sua conta"
                            className={styles.input}
                            disabled
                        />
                    )}
                </div>

                <Button
                    textButton={loading ? "Processando..." : "Iniciar Monitoramento"}
                    onClick={handleCreateMonitoring}
                />
            </div>
            {statusMsg.text && (
                <div className={styles.statusMsg}>
                    <p className={statusMsg.type === 'success' ? styles.success : styles.error}>
                        {statusMsg.text}
                    </p>
                </div>
            )}
        </>
    );
}

export default function MonitorarView() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    return (
        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <h1 className={styles.cardTitle}>Novo monitoramento</h1>
                            </div>

                            <MonitoringForm user={user} onRequireAuth={() => setIsAuthModalOpen(true)} />
                        </div>
                    </div>
                </div>
            </div>

            {isAuthModalOpen && <Modal onClose={() => setIsAuthModalOpen(false)} isOpen={isAuthModalOpen} />}
        </>
    );
}
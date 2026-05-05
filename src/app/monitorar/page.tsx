"use client"

import { VehicleSelector } from "@/components/VehicleSelector";
import styles from './Monitorar.module.scss'
import { useEffect, useState } from "react";
import { Target, Mail, TrendingUp, TrendingDown, Car } from "lucide-react"
import { Button } from "@/components/Button";
import { NumericFormat } from "react-number-format";
import { useRouter, useSearchParams } from "next/navigation";
import { useFipeForm } from "@/hooks/useFipeForm";
import { ApiErrorMessage } from "@/components/ApiErrorMensage";
import { createClient } from "@/utils/supabase/client"

export default function Monitorar() {
    const fipe = useFipeForm()
    const { hasError, refetchAll, dismissError } = fipe
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient();
    const [email, setEmail] = useState('')
    const [priceTrend, setPriceTrend] = useState<"up" | "down">('up')
    const [targetPrice, setTargetPrice] = useState<number>(1000)
    const [loading, setLoading] = useState(false)
    const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })
    const [user, setUser] = useState<any>(null);
    const MIN_VALUE = 1000;
    const brandName = fipe.brands?.find(b => b.code === fipe.brand)?.name
    const modelName = fipe.models?.find(m => m.code === fipe.model)?.name
    const yearName = fipe.years?.find(y => y.code === fipe.year)?.name

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            if (data.user?.email) setEmail(data.user.email);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (!currentUser) {
                setEmail('');
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    useEffect(() => {
        const vehicleType = searchParams.get("vehicleType")
        const brand = searchParams.get("brand")
        const model = searchParams.get("model")
        const year = searchParams.get("year")

        if (vehicleType) fipe.onVehicleChange(vehicleType)
        if (brand) fipe.onBrandChange(brand)
        if (model) fipe.onModelChange(model)
        if (year) fipe.onYearChange(year)

        if (vehicleType && brand && model && year) {
            router.replace("/monitorar")
        }
    }, [searchParams, router]);

    const handleCreateMonitoring = async () => {
        if (!user) {
            setStatusMsg({ type: 'error', text: 'Você precisa estar logado para monitorar.' });
            return;
        }

        if (!fipe.brand || !fipe.model || !fipe.year || !email || !targetPrice) {
            setStatusMsg({ type: 'error', text: 'Preencha todos os campos corretamente.' });
            return;
        }

        setLoading(true);
        setStatusMsg({ type: null, text: '' });

        try {
            const monitoringData = {
                vehicle_type: fipe.vehicleType,
                brand: fipe.brand,
                brand_name: brandName,
                model: fipe.model,
                model_name: modelName,
                year: fipe.year,
                year_name: yearName,
                target_price: targetPrice,
                price_trend: priceTrend,
                email: email.toLowerCase().trim(),
                email_sent: false,
                is_confirmed: true,
                user_id: user.id
            };

            const { error: dbError } = await supabase
                .from('price_alerts')
                .insert([monitoringData])
                .select()
                .single();

            if (dbError) {
                throw new Error(dbError.message);
            }

            setStatusMsg({
                type: 'success',
                text: 'Monitoramento criado com sucesso!'
            });

            fipe.resetForm();
            setTargetPrice(1000);

        } catch (err: any) {
            console.error("Erro capturado:", err);

            const errorMessage = err.message?.includes('Limite de monitoramentos')
                ? "Você atingiu o limite de 3 monitoramentos permitidos."
                : (err.message || 'Erro ao criar monitoramento.');

            setStatusMsg({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setLoading(false);
            setTimeout(() => setStatusMsg({ type: null, text: '' }), 7000);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Novo monitoramento</h2>
                        </div>

                        {hasError && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <ApiErrorMessage onRetry={refetchAll} onDismiss={dismissError} />
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
                                <label className={styles.label}>
                                    Preço alvo (Mínimo: R$ 1.000)
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.prefix}>R$</span>
                                    <NumericFormat
                                        value={targetPrice}
                                        onValueChange={(values) => setTargetPrice(Number(values.value))}
                                        onBlur={() => targetPrice < MIN_VALUE && setTargetPrice(MIN_VALUE)}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={0}
                                        allowNegative={false}
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
                                        <TrendingUp size={16} />
                                        Aumentar preço
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.trendButton} ${priceTrend === "down" ? styles.trendDown : ""}`}
                                        onClick={() => setPriceTrend("down")}
                                    >
                                        <TrendingDown size={16} />
                                        Diminuir preço
                                    </button>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <div className={styles.cardSubtitle}>
                                    <div className={styles.icon}><Mail size={16} /></div>
                                    <h2>Endereço eletrônico</h2>
                                </div>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Insira seu email"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                textButton={loading ? "Processando..." : "Iniciar Monitoramento"}
                                onClick={handleCreateMonitoring}
                            />

                            {statusMsg.text && (
                                <p className={statusMsg.type === 'success' ? styles.success : styles.errorMsg}>
                                    {statusMsg.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
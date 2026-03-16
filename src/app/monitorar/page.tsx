"use client"

import { VehicleSelector } from "@/components/VehicleSelector";
import styles from './Monitorar.module.scss'
import { useState } from "react";
import { Target, Mail, TrendingUp, TrendingDown, Car } from "lucide-react"
import { Button } from "@/components/Button";
import { NumericFormat } from "react-number-format";

export default function Monitorar() {
    const [priceTrend, setPriceTrend] = useState<"up" | "down" | null>(null)
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Novo monitoramento</h2>
                        </div>
                        <div className={styles.cardSubtitle}>
                            <div className={styles.icon}>
                                <Car size={16} />
                            </div>
                            <h2>Detalhes do veículo</h2>
                        </div>
                        <VehicleSelector />
                        <div className={styles.monitorGrid}>

                            <div className={styles.field}>
                                <div className={styles.cardSubtitle}>
                                    <div className={styles.icon}>
                                        <Target size={16} />
                                    </div>
                                    <h2>Preço alvo</h2>
                                </div>
                                <label className={styles.label}>
                                    Preço alvo (Valor mínimo: R$ 1.000)
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.prefix}>R$</span>
                                    <NumericFormat
                                        value="1000"
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
                                        className={`${styles.trendButton} ${priceTrend === "up" ? styles.trendUp : ""
                                            }`}
                                        onClick={() => setPriceTrend("up")}
                                    >
                                        <TrendingUp size={16} />
                                        Aumentar preço
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.trendButton} ${priceTrend === "down" ? styles.trendDown : ""
                                            }`}
                                        onClick={() => setPriceTrend("down")}
                                    >
                                        <TrendingDown size={16} />
                                        Diminuir preço
                                    </button>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <div className={styles.cardSubtitle}>
                                    <div className={styles.icon}>
                                        <Mail size={16} />
                                    </div>
                                    <h2>Endereço eletrônico</h2>
                                </div>
                                <label className={styles.label}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Insira seu email"
                                    className={styles.input}
                                />
                            </div>
                            <Button textButton="Iniciar Monitoramento" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
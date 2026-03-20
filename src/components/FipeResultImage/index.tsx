"use client"

import styles from "./FipeResultImage.module.scss"
import { Tag, Calendar, Fuel, CheckCircle2, Globe } from "lucide-react"
import logo from '../../../public/fipe-logo.svg'
import Image from "next/image"
import { formatDate } from "@/utils/formatDate"

export function FipeResultImage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.brand}>
                        <Image src={logo} className={styles.logo} alt="Fipe Radar Logo" />
                        <div>
                            <p className={styles.brandTitle}>FIPE Radar</p>
                            <p className={styles.brandSubtitle}>
                                Tabela de preços de veículos
                            </p>
                        </div>
                    </div>

                    <div className={styles.date}>
                        <p className={styles.dateLabel}>Consulta realizada em</p>
                        <p className={styles.dateValue}>{formatDate()}</p>
                    </div>
                </div>

                <div className={styles.vehicleInfo}>
                    <p className={styles.vehicleLabel}>Veículo Consultado</p>
                    <h2 className={styles.vehicleTitle}>
                        Chevrolet Vectra
                    </h2>
                </div>

                <div className={styles.priceCard}>
                    <div className={styles.priceTop}>
                        <div>
                            <p className={styles.priceLabel}>Valor na tabela FIPE</p>
                            <p className={styles.priceValue}>
                                R$ 23.600
                            </p>
                        </div>
                    </div>

                    <p className={styles.reference}>
                        Referência: Março de 2026
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Tag />
                        </div>
                        <p className={styles.cardLabel}>Código FIPE</p>
                        <p className={styles.cardValue}>164433-7</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Calendar />
                        </div>
                        <p className={styles.cardLabel}>Ano/Modelo</p>
                        <p className={styles.cardValue}>2000/2001</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Fuel />
                        </div>
                        <p className={styles.cardLabel}>Combustível</p>
                        <p className={styles.cardValue}>Gasolina</p>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerLeft}>
                        <CheckCircle2 color="#01ae46" />
                        <span>Dados oficiais da tabela FIPE</span>
                    </div>

                    <p className={styles.footerRight}>
                        <Globe />
                        fiperadar.site
                    </p>
                </div>

            </div>
        </div>
    )
}
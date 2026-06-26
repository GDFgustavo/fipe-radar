"use client"

import styles from "./FipeResultImage.module.scss"
import { Tag, Calendar, Fuel, CheckCircle2, Globe } from "lucide-react"
import { formatDate } from "@/utils/formatDate"
import { VehicleDetails } from "@/types/vehicle"

interface FipeResultImageProps {
    data: VehicleDetails;
    variation?: {
        texto: string;
        isPositive: boolean;
        sinal: string;
    } | null;
}

export function FipeResultImage({ data, variation }: FipeResultImageProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.brand}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.logo} version="1.0" width="672.000000pt" height="672.000000pt" viewBox="0 0 672.000000 672.000000" preserveAspectRatio="xMidYMid meet">
                            <metadata>
                                Created by potrace 1.16, written by Peter Selinger 2001-2019
                                <meta name="Producer" content="Online-Convert" /></metadata>
                            <g transform="translate(0.000000,672.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path d="M3371 6113 c-5 -21 -28 -108 -50 -193 -22 -85 -62 -240 -90 -345 -28 -104 -81 -307 -119 -450 l-69 -260 -708 -5 -708 -5 -28 -105 c-15 -58 -60 -229 -100 -380 -92 -352 -179 -680 -185 -702 -5 -17 33 -18 695 -18 385 0 702 -4 705 -9 5 -8 -141 -577 -294 -1147 l-32 -121 -327 -7 c-179 -4 -496 -6 -705 -6 -208 1 -380 -1 -383 -3 -2 -3 -27 -92 -55 -199 -74 -286 -150 -579 -207 -793 -28 -104 -71 -269 -96 -365 -25 -96 -61 -233 -80 -303 -19 -70 -35 -134 -35 -142 0 -13 89 -15 712 -13 l712 3 17 65 c27 104 137 520 184 700 85 323 175 667 210 800 19 74 42 159 51 188 l16 52 496 0 c274 0 709 0 967 0 259 0 476 4 484 9 8 5 42 118 77 252 104 400 150 572 210 799 31 118 59 224 61 235 4 20 0 20 -959 17 -553 -1 -969 2 -977 7 -11 7 -8 29 17 127 17 66 54 205 81 309 120 461 161 614 178 670 l19 60 1420 3 1421 2 32 123 c18 67 55 205 81 307 80 306 157 597 194 735 20 72 36 133 36 138 0 4 -643 7 -1430 7 l-1429 0 -10 -37z" />
                            </g>
                        </svg>
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
                        {data.brand} {data.model}
                    </h2>
                </div>

                <div className={styles.priceCard}>
                    <div className={styles.priceTop}>
                        <div>
                            <p className={styles.priceLabel}>Valor na tabela FIPE</p>
                            <p className={styles.priceValue}>
                                {data.price}
                            </p>
                        </div>
                    </div>

                    <p className={styles.reference}>
                        Referência: {data.referenceMonth}
                    </p>
                </div>

                {variation && (
                    <div className={`${styles.variationBadge} ${variation.isPositive ? styles.up : styles.down}`}>
                        <span className={styles.variationLabel}>Variação (Últimos 3 meses): </span>
                        <strong className={styles.variationValue}>
                            {variation.sinal} {variation.texto}
                        </strong>
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Tag />
                        </div>
                        <p className={styles.cardLabel}>Código FIPE</p>
                        <p className={styles.cardValue}>{data.codeFipe}</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Calendar />
                        </div>
                        <p className={styles.cardLabel}>Ano/Modelo</p>
                        <p className={styles.cardValue}>{data.modelYear}</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <Fuel />
                        </div>
                        <p className={styles.cardLabel}>Combustível</p>
                        <p className={styles.cardValue}>{data.fuel}</p>
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
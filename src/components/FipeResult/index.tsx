"use client"

import { useEffect, useRef, useState } from "react"
import {
    Calendar,
    Tag,
    Info,
    ArrowRight,
    Download,
    FileText,
    ImageIcon,
    Fuel,
    History,
    X,
} from "lucide-react"
import Link from "next/link"
import styles from "./FipeResult.module.scss"
import FipeResultPdf from "../FipeResultPdf"
import { useExportPdf } from "@/hooks/useExportPdf"
import { useExportImage } from "@/hooks/useExportImage"
import { FipeResultImage } from "../FipeResultImage"
import { VehicleDetails } from "@/types/vehicle"
import { useFipeHistory } from "@/hooks/useFipe"
import { useFipeVariation } from "@/hooks/useFipeVariation"
import { formatFileName } from "@/utils/formatFileName"
import { Spinner } from "../ui/Spinner"

interface FipeResultProps {
    data: VehicleDetails
    onRemove: () => void
}
export function FipeResult({ data, onRemove }: FipeResultProps) {
    const { exportPdf } = useExportPdf()
    const { exportImage } = useExportImage()
    const { data: history, isLoading: historyLoading } = useFipeHistory(
        data.vehicleType,
        data.codeFipe,
        data.yearCode
    )
    const variation = useFipeVariation(history?.priceHistory);
    const fileName = formatFileName(data.brand, data.model);
    const [isActive, setIsActive] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const exportRef = useRef<HTMLDivElement | null>(null)

    const handleDownloadPDF = () => {
        exportPdf(<FipeResultPdf data={data} variation={variation} />, `${fileName}.pdf`)
    }

    const handleDownloadImage = () => {
        if (!exportRef.current) return
        exportImage(exportRef.current, `${fileName}.png`)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsActive(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardHeader}>

                    <div className={styles.headerTop}>
                        <div className={styles.removeButton}>
                            <button
                                className={styles.removeIcon}
                                onClick={() => onRemove()}
                            >
                                <X />
                            </button>
                        </div>

                        <div ref={dropdownRef} className={styles.dropdown}>
                            <button onClick={() => setIsActive(prev => !prev)} type="submit" className={styles.fullButton}>
                                <Download className={styles.iconSm} />
                                <span className={styles.export}>Exportar</span>
                            </button>
                            <div className={`${styles.submenu} ${isActive ? styles.open : ''}`}>
                                <button type="button" onClick={handleDownloadPDF} className={styles.primaryButton}>
                                    <FileText className={styles.iconSm} />
                                    Exportar PDF
                                </button>
                                <button type="button" onClick={handleDownloadImage} className={styles.primaryButton}>
                                    <ImageIcon className={styles.iconSm} />
                                    Exportar Imagem
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className={styles.priceBox}>
                        <p className={styles.label}>Valor FIPE</p>
                        <h2 className={styles.price}>
                            {data.price}
                        </h2>
                    </div>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.column}>
                        <div>
                            <p className={styles.label}>Veículo</p>
                            <p className={styles.vehicleName}>
                                {data.brand} {data.model}
                            </p>
                        </div>

                        <div className={styles.badges}>
                            <p className={styles.badge}>
                                <Calendar className={styles.iconXs} />
                                {data.modelYear}
                            </p>

                            <p className={styles.badge}>
                                <Tag className={styles.iconXs} />
                                {data.codeFipe}
                            </p>

                            <p className={styles.badge}>
                                <Fuel className={styles.iconXs} />
                                {data.fuel}
                            </p>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.referenceBox}>
                            <div className={styles.referenceContent}>
                                <Info className={styles.iconSmMuted} />
                                <div>
                                    <p className={styles.referenceTitle}>Referência</p>
                                    <p className={styles.referenceText}>
                                        {data.referenceMonth}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link href={{
                                pathname: "/comparar",
                                query: {
                                    vehicleType: data.vehicleType,
                                    brand: data.brandCode,
                                    model: data.modelCode,
                                    year: data.yearCode,
                                }
                            }} className={styles.flex1}>
                                <button type="submit" className={styles.primaryButton}>
                                    Comparar
                                    <ArrowRight className={styles.iconSm} />
                                </button>
                            </Link>

                            <Link href={{
                                pathname: "/monitorar",
                                query: {
                                    vehicleType: data.vehicleType,
                                    brand: data.brandCode,
                                    model: data.modelCode,
                                    year: data.yearCode,
                                },
                            }} className={styles.flex1}>
                                <button type="submit" className={styles.primaryButton}>
                                    Monitorar
                                    <ArrowRight className={styles.iconSm} />
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className={styles.historySection}>
                    <div className={styles.historyHeader}>
                        <History className={styles.iconSmMuted} size={20} />
                        <h3>Histórico de Preços (Últimos 3 meses)</h3>
                    </div>

                    {historyLoading && (
                        <div className={styles.spinnerWrapper}>
                            <Spinner />
                            <p>Buscando dados...</p>
                        </div>
                    )}

                    {history && (
                        <div className={styles.historyList}>

                            {history.priceHistory.slice(0, 3).map((item, index) => {
                                const dateParts = item.month ? item.month.split(' de ') : [];
                                const mesRaw = dateParts[0] || "";
                                const anoRaw = dateParts[1] || "";
                                let mesAbreviado = item.month;

                                if (mesRaw && anoRaw) {
                                    const mesCurto = mesRaw.substring(0, 3).toLowerCase();
                                    const anoCurto = anoRaw.substring(2);
                                    mesAbreviado = `${mesCurto}/${anoCurto}`;
                                }

                                return (
                                    <div
                                        key={index}
                                        className={`${styles.historyCard} ${index === 0 ? styles.activeCard : ''}`}
                                    >
                                        <div className={styles.leftInfo}>
                                            <div className={styles.numberBadge}>{index + 1}</div>
                                            <div className={styles.dateStack}>
                                                <span className={styles.monthText}>{mesAbreviado}</span>
                                                <span className={styles.statusLabel}>
                                                    {index === 0 ? 'Atual' : 'Referência'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.rightValue}>
                                            <span className={styles.priceText}>{item.price.replace(' ', '\u00A0')}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {variation && (
                        <div className={`${styles.variationBadge} ${variation.isPositive ? styles.up : styles.down}`}>
                            <span className={styles.variationLabel}>Variação no período</span>
                            <strong className={styles.variationValue}>
                                {variation.sinal} {variation.texto}
                            </strong>
                        </div>
                    )}

                </div>
            </div>

            <div className={styles.exportImage}>
                <div ref={exportRef}>
                    <FipeResultImage data={data} variation={variation} />
                </div>
            </div>
        </>
    )
}
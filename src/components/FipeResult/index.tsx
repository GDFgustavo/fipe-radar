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
} from "lucide-react"
import Link from "next/link"
import styles from "./FipeResult.module.scss"

export function FipeResult() {
    const [isActive, setIsActive] = useState(false)
    const dropdownRef = useRef<HTMLButtonElement | null>(null)

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
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.headerTop}>
                    <div className={styles.priceBox}>
                        <p className={styles.label}>Valor FIPE</p>
                        <h2 className={styles.price}>
                            R$ 23.600
                        </h2>
                    </div>
                    <div className={styles.dropdown}>
                        <button ref={dropdownRef} onClick={() => setIsActive(prev => !prev)} type="submit" className={styles.fullButton}>
                            <Download className={styles.iconSm} />
                            <span className={styles.export}>Exportar</span>
                        </button>
                        <div className={`${styles.submenu} ${isActive ? styles.open : ''}`}>
                            <button type="submit" className={styles.primaryButton}>
                                <FileText className={styles.iconSm} />
                                Exportar PDF
                            </button>
                            <button type="submit" className={styles.primaryButton}>
                                <ImageIcon className={styles.iconSm} />
                                Exportar Imagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.column}>
                    <div>
                        <p className={styles.label}>Veículo</p>
                        <p className={styles.vehicleName}>
                            Chevrolet Vectra
                        </p>
                    </div>

                    <div className={styles.badges}>
                        <p className={styles.badge}>
                            <Calendar className={styles.iconXs} />
                            2000
                        </p>

                        <p className={styles.badge}>
                            <Tag className={styles.iconXs} />
                            164433-7
                        </p>

                        <p className={styles.badge}>
                            Gasolina
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
                                    Março de 2026
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/comparar" className={styles.flex1}>
                            <button type="submit" className={styles.primaryButton}>
                                Comparar
                                <ArrowRight className={styles.iconSm} />
                            </button>
                        </Link>

                        <Link href="/monitorar" className={styles.flex1}>
                            <button type="submit" className={styles.primaryButton}>
                                Monitorar
                                <ArrowRight className={styles.iconSm} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

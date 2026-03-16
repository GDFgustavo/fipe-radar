"use client"

import { useState } from "react"
import { Plus, X, Car, Calendar, Tag, Fuel } from "lucide-react"
import styles from './Comparar.module.scss'
import { VehicleSelector } from "@/components/VehicleSelector"
import { Button } from "@/components/Button"

function ComparisonSlot() {
    const [isAdding, setIsAdding] = useState(false)
    const [handleAdd, setHandleAdd] = useState(false)

    if (handleAdd) {

        return (
            <div className={styles.vehicleCard}>
                <div className={styles.removeButton}>
                    <button
                        className={styles.removeIcon}
                        onClick={() => { setHandleAdd(false); setIsAdding(false) }}
                    >
                        <X />
                        <span className={styles.srOnly}>Remover veículo</span>
                    </button>
                </div>

                <div className={styles.cardHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.iconWrapper}>
                            <p className={styles.typeIcon}><Car /></p>
                        </div>
                        <div>
                            <div className={styles.cardTitle}>
                                Chevrolet
                            </div>
                            <p className={styles.cardSubtitle}>
                                Vectra
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.priceSection}>
                        <p className={styles.priceLabel}>Valor FIPE</p>
                        <p className={styles.priceValue}>
                            R$ 23,600
                        </p>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                                <Calendar className={styles.detailIcon} />
                                Ano
                            </span>
                            <span className={styles.detailValue}>
                                2000
                            </span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                                <Tag className={styles.detailIcon} />
                                Código FIPE
                            </span>
                            <span className={styles.detailValue}>
                                164433-7
                            </span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                                <Fuel className={styles.detailIcon} />
                                Combustível
                            </span>
                            <span className={styles.detailValue}>
                                Gasolina aditivada 2.0 hiper gas turbo v power
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isAdding) {
        return (
            <div className={styles.addCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.addHeader}>
                        <div className={styles.cardTitle}>
                            Adicionar Veículo
                        </div>
                        <div className={styles.removeButton}>
                            <button
                                className={styles.removeIcon}
                                onClick={() => setIsAdding(false)}
                            >
                                <X />
                                <span className={styles.srOnly}>Remover veículo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.addContent}>
                    <VehicleSelector layout="vertical" />
                    <Button textButton="Adicionar ao Comparativo" onClick={() => setHandleAdd(true)} />
                </div>
            </div>
        )
    }


    return (
        <button
            onClick={() => setIsAdding(true)}
            className={styles.emptySlot}
        >
            <div className={styles.emptyIconWrapper}>
                <Plus className={styles.emptyIcon} />
            </div>
            <div className={styles.emptyText}>
                <p className={styles.emptyTitle}>Adicionar Veículo</p>
                <p className={styles.emptySubtitle}>
                    Clique para selecionar
                </p>
            </div>
        </button>
    )

}

export default function CompararPage() {

    return (
        <div className={styles.section}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Compare Veículos
                    </h1>
                    <p className={styles.subtitle}>
                        Adicione até 3 veículos e compare seus valores FIPE lado a lado para tomar a melhor decisão.
                    </p>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryContent}>

                        <div className={styles.summaryBlockLeft}>
                            <p className={styles.summaryLabel}>Menor valor</p>
                            <p className={styles.summaryHighlight}>
                                R$ 20000
                            </p>
                        </div>

                        <div className={styles.summaryBlockCenter}>
                            <p className={styles.summaryLabel}>Diferença</p>
                            <p className={styles.summaryValue}>
                                R$ 320000
                            </p>
                        </div>

                        <div className={styles.summaryBlockRight}>
                            <p className={styles.summaryLabel}>Maior valor</p>
                            <p className={styles.summaryValue}>
                                R$ 25000
                            </p>
                        </div>

                    </div>
                </div>

                <div className={styles.grid}>
                    <ComparisonSlot />
                    <ComparisonSlot />
                    <ComparisonSlot />

                </div>

                <p className={styles.helpText}>
                    Adicione veículos clicando nos cards acima para iniciar a comparação.
                </p>
            </div>
        </div>
    )

}

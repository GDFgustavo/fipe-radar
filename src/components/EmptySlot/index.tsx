"use client"

import { Plus } from "lucide-react"
import styles from "./EmptySlot.module.scss"

type Props = {
    onClick: () => void
}

export function EmptySlot({ onClick }: Props) {
    return (
        <button onClick={onClick} className={styles.emptySlot}>
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
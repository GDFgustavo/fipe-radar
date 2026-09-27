'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/Button'
import styles from '../MyMonitoring.module.scss'

interface EmptyState {
    onClick: () => void
}

export function EmptyState({ onClick }: EmptyState) {
    return (
        <section className={styles.empty}>

            <div className={styles.emptyContent}>
                <h2 className={styles.emptyTitle}>
                    Nenhum monitoramento ativo
                </h2>

                <p className={styles.emptyDescription}>
                    Acompanhe o preço de um veículo e receba um alerta quando
                    ele atingir o valor que você deseja.
                </p>
                <div>
                    <Button
                        textButton="Novo monitoramento"
                        icon={Plus}
                        onClick={onClick}
                    />
                </div>
            </div>
        </section>
    )
}
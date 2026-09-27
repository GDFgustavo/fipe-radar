'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { MonitoringPrice } from './MonitoringPrice'

import styles from '../MyMonitoring.module.scss'

interface MonitoringCard {
    item: any
}

export function MonitoringCard({ item }: MonitoringCard) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const dataCriacao = new Date(item.created_at).toLocaleDateString('pt-BR')
    const anoFormatado = item.year_name?.slice(0, 4) || 'N/A'
    const isTargetReached = item.status === 'reached'

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const { error } = await supabase
                .from('price_alerts')
                .delete()
                .eq('id', item.id)

            if (error) throw error
            router.refresh()
        } catch (error: any) {
            console.error('Erro ao deletar:', error.message)
            setIsDeleting(false)
            setIsConfirming(false)
        }
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.vehicleInfo}>
                    <div className={styles.details}>
                        <h3 className={styles.vehicleTitle}>{item.brand_name} {item.model_name}</h3>
                        <p className={styles.vehicleSub}>
                            {anoFormatado}
                            {item.fuel ? ` • ${item.fuel}` : ''}
                        </p>
                        <p className={styles.fipeCode}>Código FIPE: {item.code_fipe}</p>
                    </div>
                </div>

                <div className={styles.metricsContainer}>
                    <MonitoringPrice
                        initialPrice={item.initial_price}
                        currentPrice={item.current_price}
                        targetPrice={item.target_price}
                        type={item.price_trend}
                        status={item.status}
                    />
                </div>

                <div className={styles.statusActionContainer}>
                    <div className={styles.statusWrapper}>
                        <span className={`${styles.statusDot} ${isTargetReached ? styles.conclu : styles.pend}`} />
                        <div className={styles.statusTextGroup}>
                            <span className={styles.statusTitle}>{isTargetReached ? 'Atingiu o preço' : 'Monitorando'}</span>
                            <span className={styles.statusDate}>{dataCriacao}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => setIsConfirming(true)}
                        aria-label="Opções"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {isConfirming && (
                    <div className={styles.cardActions} onClick={() => setIsConfirming(false)}>
                        <div className={styles.confirmContainer}>
                            <span className={styles.confirmText}>Deseja excluir?</span>
                            <button onClick={handleDelete} disabled={isDeleting} className={styles.btnYes}>
                                {isDeleting ? '...' : 'Sim'}
                            </button>
                            <button onClick={() => setIsConfirming(false)} disabled={isDeleting} className={styles.btnNo}>
                                Não
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { getVehicleIcon } from '@/utils/vehicleIcon'
import styles from '@/app/meus-monitoramentos/MyMonitorings.module.scss'

interface MonitoringCardProps {
    item: any
}

export function MyMonitoringCard({ item }: MonitoringCardProps) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const dataCriacao = new Date(item.created_at).toLocaleDateString('pt-BR')
    const anoFormatado = item.year_name?.slice(0, 4) || 'N/A'
    const diferencaPreco = item.current_price - item.target_price

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
        <div className={`${styles.card}  ${item.email_sent ? styles.reached : styles.default}`}>
            <div className={styles.removeButton}>
                <button
                    onClick={() => setIsConfirming(true)}
                    className={styles.deleteBtn}
                    title="Parar de Monitorar"
                >
                    <Trash2 size={18} />
                </button>
            </div>
            <div key={item.id} className={`${styles.vehicleCard}`}>
                <div className={styles.cardGrid}>
                    <div className={styles.vehicleInfo}>
                        <div className={styles.carIconContainer}>
                            <div className={styles.carIcon}>
                                {getVehicleIcon(item.vehicle_type)}
                            </div>
                        </div>
                        <div className={styles.details}>
                            <h3>{item.brand_name} {item.model_name}</h3>
                            <p>Ano: {anoFormatado} • Criado em {dataCriacao}</p>
                        </div>
                    </div>

                    <div className={styles.det}>
                        <span className={styles.spa}>Diferença</span>
                        <div className={styles.value}>
                            R$ {diferencaPreco}
                        </div>
                    </div>
                    <div className={styles.det}>
                        <span>Status</span>
                        <div className={styles.currentPrice}>
                            {item.email_sent ? (
                                <p className={styles.reachedBadge}>Preço Alvo Atingido!</p>
                            ) : (
                                <p className={styles.pendingBadge}>Monitorando</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.priceData}>
                    <div className={styles.priceGroup}>
                        <span>Preço Atual</span>
                        <div className={styles.currentPrice}>
                            R$ {item.current_price}
                        </div>

                    </div>

                    <div className={styles.priceGroup}>
                        <span>Preço Alvo</span>
                        <div className={styles.targetPrice}>
                            R$ {item.target_price}
                        </div>
                    </div>
                </div>
            </div>
            {isConfirming && (
                <div className={styles.cardActions} onClick={() => setIsConfirming(false)}>
                    <div className={styles.confirmContainer}>
                        <span className={styles.confirmText}>Tem certeza?</span>
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

    )
}
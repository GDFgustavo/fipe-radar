'use client'

import { Target } from 'lucide-react'
import styles from './MyMonitorings.module.scss'

interface MonitoringLimitProps {
    currentCount: number | undefined
}

export function MonitoringLimit({ currentCount = 0 }: MonitoringLimitProps) {
    const MAX_LIMIT = 3

    const percentage = Math.min((currentCount / MAX_LIMIT) * 100, 100)
    const isLimitReached = currentCount >= MAX_LIMIT

    return (
        <div className={`${styles.limitCard} ${isLimitReached ? styles.reached : ''}`}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Target size={18} className={styles.icon} />
                    <span>Seu Limite</span>
                </div>
                <span className={styles.counter}>
                    <strong>{currentCount}</strong> de {MAX_LIMIT}
                </span>
            </div>

            <div className={styles.progressBarTrack}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className={styles.helperText}>
                {isLimitReached && 'Você atingiu o limite máximo de monitoramentos gratuitos.'}
            </p>
        </div>
    )
}
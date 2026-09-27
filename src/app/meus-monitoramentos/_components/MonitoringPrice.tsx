'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'
import styles from '../MyMonitoring.module.scss'

interface MonitoringPrice {
    initialPrice: number
    currentPrice: number
    targetPrice: number
    type: 'up' | 'down'
    status: 'monitoring' | 'reached'
}

export function MonitoringPrice({ initialPrice, currentPrice, targetPrice, type, status }: MonitoringPrice) {
    let percentage = 0
    const isTargetReached = status === 'reached'
    const priceDifference = Math.abs(currentPrice - targetPrice)
    const iconPriceTrend =
        type === 'down'
            ? <ArrowDown className={styles.trendArrow} size={16} />
            : <ArrowUp className={styles.trendArrow} size={16} />

    if (type === 'down') {
        percentage =
            ((initialPrice - currentPrice) /
                (initialPrice - targetPrice)) * 100
    } else {
        percentage =
            ((currentPrice - initialPrice) /
                (targetPrice - initialPrice)) * 100
    }

    const clampedPercentage = Math.min(
        Math.max(percentage, 0),
        100
    )


    return (
        <>
            <div className={styles.priceContainer}>
                <span>Atual: <strong>R$ {currentPrice.toLocaleString('pt-BR')}</strong></span>
                <span>Alvo: <strong>R$ {targetPrice.toLocaleString('pt-BR')}</strong></span>
            </div>

            <div className={styles.progressBarTrack}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${clampedPercentage}%` }}
                />
            </div>

            <div className={styles.priceDifference}>
                <p className={styles.helperText}>
                    {isTargetReached
                        ? `Meta atingida · R$ ${priceDifference.toLocaleString('pt-BR')} ${type === 'down' ? 'abaixo' : 'acima'
                        } do alvo.`
                        : `Faltam R$ ${priceDifference.toLocaleString('pt-BR')} para atingir o preço alvo.`
                    }
                </p>
                <div className={styles.iconPrice} >
                    {iconPriceTrend}
                </div>
            </div>
        </>
    )
}
'use client'

import { X } from 'lucide-react'
import { useLockScroll } from '@/hooks/useLockScroll'
import styles from './Drawer.module.scss'

interface DrawerProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title: string
    subtitle: string
    footer: React.ReactNode;
}

export function Drawer({ isOpen, onClose, children, title, subtitle, footer }: DrawerProps) {
    useLockScroll(isOpen)

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div
                className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <div>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    {children}
                </div>

                {footer && (
                    <div className={styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
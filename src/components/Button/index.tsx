import { ElementType } from 'react'
import styles from './Button.module.scss'

interface Props {
    textButton: string
    onClick?: () => void
    icon?: ElementType
}

export function Button({ textButton, onClick, icon: Icon }: Props) {
    return (
        <button
            type="button"
            className={styles.searchButton}
            onClick={onClick}
        >
            {Icon && <Icon size={20} className={styles.icon} />}
            <span>{textButton}</span>
        </button>
    )
}
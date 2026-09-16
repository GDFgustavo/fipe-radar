import { ElementType } from 'react'
import styles from './Button.module.scss'

interface Props {
    textButton: string
    onClick?: () => void
    icon?: ElementType
    form?: string
}

export function Button({ textButton, onClick, icon: Icon, form }: Props) {
    return (
        <button
            type="submit"
            className={styles.searchButton}
            onClick={onClick}
            form={form}
        >
            {Icon && <Icon size={20} className={styles.icon} />}
            <span>{textButton}</span>
        </button>
    )
}
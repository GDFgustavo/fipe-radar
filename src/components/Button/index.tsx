import styles from './Button.module.scss'

interface Props {
    textButton: string
    onClick?: () => void
}

export function Button({ textButton, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.searchButton}
            onClick={onClick}
        >
            {textButton}
        </button>
    )
}
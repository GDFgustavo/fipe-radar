import styles from './MyMonitoring.module.scss'

export default function loading() {
    return (
        <div className={styles.container}>
            <header className={styles.pageHeader}>
                <div>
                    <h1>Meus Monitoramentos</h1>
                    <p>Acompanhe a variação de preço da tabela FIPE</p>
                </div>
            </header>

            <section className={styles.listSection}>
                {[1, 2, 3].map((item) => (
                    <div key={item} className={styles.vehicleCardSkeleton}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonText} />
                        <div className={styles.skeletonPrice} />
                    </div>
                ))}
            </section>
        </div>
    )
}
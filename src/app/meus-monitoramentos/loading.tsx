import styles from './MyMonitorings.module.scss';

export default function MyMonitoringsLoading() {
    const lodingItems = Array.from({ length: 3 });

    return (
        <div className={styles.container}>
            <header className={styles.pageHeader}>
                <div>
                    <h1>Meus Monitoramentos</h1>
                    <p>Acompanhe a variação de preço da tabela FIPE</p>
                </div>
            </header>

            <section className={styles.statsGrid}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className={` ${styles.skeletonCard}`}>
                        <div className={styles.skeletonPulse}></div>
                    </div>
                ))}
            </section>

            <section className={styles.listSection}>
                {lodingItems.map((_, index) => (
                    <div key={index} className={`${styles.vehicleCardSkeleton}`}>
                        <div className={styles.skeletonPulse}></div>
                    </div>
                ))}
            </section>
        </div>
    );
}
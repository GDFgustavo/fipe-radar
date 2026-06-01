import { LucideIcon } from 'lucide-react';
import styles from './FeatureSection.module.scss';

interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeatureSectionProps {
    sectionTitle: string;
    sectionDescription: string;
    items: FeatureItem[];
}

export default function FeatureSection({ sectionTitle, sectionDescription, items }: FeatureSectionProps) {
    return (
        <section className={styles.featuresSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
                    <p className={styles.sectionDescription}>{sectionDescription}</p>
                </div>

                <div className={`${styles.featuresGrid} ${items.length === 3 ? styles.gridThree : styles.gridFour}`}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureContent}>
                                <div className={styles.featureIcon}>
                                    <item.icon className={styles.iconLarge} />
                                </div>
                                <h3 className={styles.featureTitle}>{item.title}</h3>
                                <p className={styles.featureDescription}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
import Link from 'next/link';
import {
    Search,
    BarChart2,
    Bell,
    Shield,
    Calendar,
    Check,
    Building2,
    CarFront,
    Info
} from 'lucide-react';

import { formatMonthYear } from '@/utils/formatDate';
import styles from './ResourcesSection.module.scss';

type Props = {
    onClick: () => void
}

export default function ResourcesSection({ onClick }: Props) {
    return (
        <section className={styles.featuresSection}>
            <div className={styles.container}>

                <div className={styles.sectionHeader}>
                    <h2>Tudo para acompanhar o valor do seu veículo</h2>
                    <p>Ferramentas para consultar preços, comparar modelos e acompanhar as variações do mercado.</p>
                </div>

                <div className={styles.featuresGrid}>

                    <div className={styles.card} onClick={onClick}>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.iconBase} ${styles.iconGreen}`}>
                                <Search size={20} />
                            </div>
                            <h3>Consulta rápida</h3>
                        </div>
                        <p className={styles.description}>
                            Encontre o valor Fipe de qualquer veículo em segundos.
                        </p>

                        <div className={styles.content}>
                            <dl className={styles.dataList}>
                                <div><dt>Veículo</dt><dd>Honda Civic EXL</dd></div>
                                <div><dt>Ano</dt><dd>2021</dd></div>
                                <div><dt>Combustível</dt><dd>Flex</dd></div>
                            </dl>

                            <div className={styles.priceHighlight}>
                                <span className={styles.priceLabel}>Valor FIPE Atual</span>
                                <div className={styles.priceValue}>
                                    R$ 127.568
                                </div>
                                <span className={styles.priceDate}>Referência: Jul 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <Link href={'/comparar'}>
                            <div className={styles.cardHeader}>
                                <div className={`${styles.iconBase} ${styles.iconBlue}`}>
                                    <BarChart2 size={20} />
                                </div>
                                <h3>Compare veículos</h3>
                            </div>
                            <p className={styles.description}>
                                Compare até 3 veículos lado a lado e tome decisões inteligentes.
                            </p>

                            <div className={styles.content}>
                                <ul className={styles.compareList}>
                                    <li className={styles.compareItem}>
                                        <div className={styles.carInfo}>
                                            <span className={styles.carName}>1. VW Virtus 24</span>
                                        </div>
                                        <span className={styles.carPrice}>R$ 117.941</span>
                                    </li>

                                    <li className={styles.compareItem}>
                                        <div className={styles.carInfo}>
                                            <span className={styles.carName}>2. Nissan Sentra 24</span>
                                            <span className={`${styles.carDiff} ${styles.plusText}`}>
                                                + R$ 3.620
                                            </span>
                                        </div>
                                        <span className={styles.carPrice}>R$ 121.561</span>
                                    </li>

                                    <li className={styles.compareItem}>
                                        <div className={styles.carInfo}>
                                            <span className={styles.carName}>3. Corolla XEi 24</span>
                                            <span className={`${styles.carDiff} ${styles.plusText}`}>
                                                + R$ 23.247
                                            </span>
                                        </div>
                                        <span className={styles.carPrice}>R$ 141.188</span>
                                    </li>
                                </ul>

                                <div className={styles.infoToast}>
                                    <span>Diferença max/min</span>
                                    <strong>R$ 23.247</strong>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <Link href={'/monitorar'}>
                            <div className={styles.cardHeader}>
                                <div className={`${styles.iconBase} ${styles.iconYellow}`}>
                                    <Bell size={20} />
                                </div>
                                <h3>Alertas de preço</h3>
                            </div>
                            <p className={styles.description}>
                                Seja notificado quando o veículo atingir o preço desejado.
                            </p>

                            <div className={styles.content}>
                                <div className={styles.statusBadge}>
                                    <span className={styles.dot}></span> Monitoramento Ativo
                                </div>

                                <dl className={styles.dataList}>
                                    <div><dt>Veículo</dt><dd>Yamaha MT-03</dd></div>
                                    <div><dt>Alvo</dt><dd>R$ 26.800</dd></div>
                                    <div><dt>Atual</dt><dd>R$ 29.555</dd></div>
                                </dl>

                                <div className={styles.infoToast}>
                                    <Info size={18} />
                                    <span>Faltam <strong>R$ 2.755</strong> para atingir sua meta.</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.iconBase} ${styles.iconPurple}`}>
                                <Shield size={20} />
                            </div>
                            <h3>Dados oficiais</h3>
                        </div>
                        <p className={styles.description}>
                            Informações sincronizadas direto da base oficial.
                        </p>

                        <div className={styles.content}>
                            <ul className={styles.featureList}>
                                <li>
                                    <Calendar size={18} />
                                    <div>
                                        <strong>Atualização</strong>
                                        <span className={styles.date}>{formatMonthYear(new Date())}</span>
                                    </div>
                                </li>
                                <li>
                                    <Check size={18} />
                                    <div>
                                        <strong>Fonte</strong>
                                        <span>Tabela FIPE</span>
                                    </div>
                                </li>
                                <li>
                                    <Building2 size={18} />
                                    <div>
                                        <strong>Cobertura</strong>
                                        <span>90+ Fabricantes</span>
                                    </div>
                                </li>
                                <li>
                                    <CarFront size={18} />
                                    <div>
                                        <strong>Volume</strong>
                                        <span>13.000+ Modelos</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
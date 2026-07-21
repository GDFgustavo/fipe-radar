'use client'

import { Clock, TrendingUp } from "lucide-react"
import { useVehicleStore } from '@/store/useVehicleStore';

import { VehicleSelector } from '@/components/VehicleSelector';
import { Button } from '@/components/Button';
import { FipeResult } from '@/components/FipeResult';
import { Spinner } from '@/components/ui/Spinner';
import { ApiErrorMessage } from '@/components/ApiErrorMensage';
import ResourcesSection from '@/components/ResourcesSection';
import BrandScrolling from '@/components/BrandScrolling';

import { useFipeForm } from '@/hooks/useFipeForm';
import { scrollSmooth } from '@/utils/scrollSmooth';
import { formatMonthYear } from '@/utils/formatDate';
import styles from './page.module.scss'
import { Hero } from "@/components/Hero";

const steps = [
    {
        step: "01",
        title: "Selecione o tipo",
        description:
            "Escolha entre carros, motos ou caminhões para iniciar sua consulta.",
    },
    {
        step: "02",
        title: "Escolha marca e modelo",
        description:
            "Navegue por centenas de marcas e milhares de modelos disponíveis.",
    },
    {
        step: "03",
        title: "Veja o valor FIPE",
        description:
            "Obtenha instantaneamente o preço atualizado segundo a Tabela FIPE.",
    },
];

const stats = [
    { value: "+90 Marcas", label: "Todos os veículos do mercado nacional" },
    { value: "3 Categorias", label: "Carros, Motos e Caminhões" },
    { value: "100% Gratuito", label: "Consulta oficial e rápida" },
]

export default function PageView() {
    const fipe = useFipeForm()
    const { fillForm, isDetailsLoading, historyLoading, hasError, refetchAll, dismissError } = fipe
    const { lastResult, setLastResult, clearLastResult } = useVehicleStore();

    const scrollToResult = async () => {
        const result = await fipe.onSubmit();
        scrollSmooth("result", 60)
        if (result) setLastResult(result);
    }

    const scrollToHero = (type: string, code: string,) => {
        fillForm(type, code, "", "")
        scrollSmooth("hero", 140)
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <Hero />

                <div className={styles.container}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <div className={styles.badge}>
                                <TrendingUp className={styles.badgeIcon} />
                                <span>
                                    Atualizado em {formatMonthYear(new Date())}
                                </span>
                            </div>

                            <h1 className={styles.heroTitle}>
                                Consulte valores FIPE em tempo real
                            </h1>

                            <p className={styles.heroDescription}>
                                Encontre os preços mais precisos de carros, motos e caminhões.
                                Compare veículos e monitore a evolução dos valores para fazer o
                                melhor negócio.
                            </p>

                            <div className={styles.stats}>
                                {stats.map((stat) => (
                                    <div key={stat.label} className={styles.statItem}>
                                        <p className={styles.statValue}>{stat.value}</p>
                                        <p className={styles.statLabel}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="hero" className={styles.heroCardWrapper}>
                            <div className={styles.heroCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <h2 className={styles.cardTitle}>Consulte agora</h2>
                                        <p className={styles.cardSubtitle}>
                                            Selecione o veículo para ver o valor FIPE
                                        </p>
                                    </div>
                                    <VehicleSelector {...fipe} />
                                    <Button onClick={scrollToResult} textButton="Consultar Valor FIPE" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {(hasError || isDetailsLoading || lastResult) && (
                <section id="result" className={styles.resultSection}>
                    <div className={styles.resultContainer}>

                        {hasError && (
                            <ApiErrorMessage onRetry={refetchAll} onDismiss={dismissError} />
                        )}

                        {!hasError && isDetailsLoading && (
                            <div className={styles.loading}>
                                <Spinner />
                            </div>
                        )}

                        {!hasError && !isDetailsLoading && !historyLoading && lastResult && (
                            <FipeResult data={lastResult} onRemove={clearLastResult} />
                        )}

                    </div>
                </section>
            )}

            <ResourcesSection
                onClick={() => scrollSmooth("hero", 140)}
            />

            <div className={styles.brandScrollingContainer}>
                <div className={styles.container}>
                    <p className={styles.sectionDescription}>Cobertura completa de marcas nacionais e importadas</p>
                    <BrandScrolling onSelect={(type, code) => scrollToHero(type, code)} />
                </div>
            </div>

            <section className={styles.howItWorks}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Como funciona</h2>
                        <p className={styles.sectionDescription}>
                            Em poucos passos você encontra o valor exato do seu veículo
                        </p>
                    </div>

                    <div className={styles.stepsGrid}>
                        {steps.map((item => (
                            <div key={item.step} className={styles.stepCard}>
                                <div className={styles.stepCircle}>{item.step}</div>
                                <h3 className={styles.stepTitle}>{item.title}</h3>
                                <p className={styles.stepText}>{item.description}</p>
                            </div>
                        )))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <Clock className={styles.ctaIcon} />
                        <h2 className={styles.ctaTitle}>
                            Monitore e receba alertas
                        </h2>
                        <p className={styles.ctaText}>
                            Configure alertas de preço e seja notificado quando o veículo
                            atingir o valor que você deseja.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
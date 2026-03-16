import { formatMonthYear } from '@/utils/formatDate';
import styles from './page.module.scss'
import { BarChart2, Bell, Clock, Search, Shield, TrendingUp } from "lucide-react"
import { VehicleSelector } from '@/components/VehicleSelector';
import { Button } from '@/components/Button';

const features = [
  {
    icon: Search,
    title: "Consulta Rápida",
    description: "Encontre o valor FIPE de qualquer veículo em segundos com nossa busca simplificada.",
  },
  {
    icon: BarChart2,
    title: "Compare Veículos",
    description: "Compare até 3 veículos lado a lado e tome decisões mais inteligentes.",
  },
  {
    icon: Bell,
    title: "Alertas de Preço",
    description: "Receba notificações quando o veículo atingir o preço desejado.",
  },
  {
    icon: Shield,
    title: "Dados Confiáveis",
    description: "Informações atualizadas diretamente da Tabela FIPE oficial.",
  },
]

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
  { value: "50k+", label: "Veículos cadastrados" },
  { value: "100+", label: "Marcas disponíveis" },
  { value: "15 anos", label: "De histórico" },
]

export default function Home() {

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.badge}>
                <TrendingUp className={styles.badgeIcon} />
                <time dateTime={new Date().toISOString()}>
                  {formatMonthYear(new Date())}
                </time>
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

            <div className={styles.heroCardWrapper}>
              <div className={styles.heroCard}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Consulte agora</h2>
                    <p className={styles.cardSubtitle}>
                      Selecione o veículo para ver o valor FIPE
                    </p>
                  </div>
                  <VehicleSelector />
                  <Button textButton="Consultar Valor FIPE" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.resultSection}>
        <div className={styles.resultContainer}>
          <p>Resultado da consulta</p>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Tudo que você precisa para decidir
            </h2>
            <p className={styles.sectionDescription}>
              Ferramentas completas para consultar, comparar e acompanhar os
              valores de veículos no mercado brasileiro.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureContent}>
                  <div className={styles.featureIcon}>
                    <feature.icon className={styles.iconLarge} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

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
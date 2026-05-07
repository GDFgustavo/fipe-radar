import { Metadata } from 'next';
import PageView from './PageView';

export const metadata: Metadata = {
  title: 'FIPE Radar | Consulte a Tabela FIPE com preços oficiais atualizados',
  description: 'Consulte o valor atualizado de carros, motos, caminhões e ônibus. Dados oficiais da Tabela FIPE atualizados mensalmente com rapidez e precisão',
  alternates: {
    canonical: 'https://www.fiperadar.site',
  },
  openGraph: {
    title: 'Tabela FIPE 2026: Quanto vale seu veículo hoje?',
    description: 'Acesse a FIPE Radar e descubra o valor de mercado de qualquer veículo em segundos. Grátis e sempre atualizado',
    url: 'https://www.fiperadar.site',
    siteName: 'FIPE Radar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fipe Radar",
    "url": "https://www.fiperadar.site",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Ferramenta gratuita para consulta, comparação e monitoramento de preços da Tabela Fipe.",
    "featureList": "Consulta de preços, Comparação de veículos, Monitoramento de veículos"
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageView />
    </>
  )
}
import { Metadata } from "next";
import MonitorarView from "./MonitorarView";

export const metadata: Metadata = {
    title: 'Monitoramento de Preços e Alertas de Variação',
    description: 'Acompanhe a subida ou descida nos preços de veículos. Receba alertas automáticos quando o valor na Tabela FIPE mudar, seja para vender ou comprar',
    alternates: {
        canonical: 'https://www.fiperadar.site/monitorar',
    },
    openGraph: {
        title: 'Saiba o momento certo de comprar ou vender seu veículo!',
        description: 'Monitore as variações da Tabela FIPE e receba avisos de alta ou baixa de preços diretamente no seu e-mail',
        url: 'https://www.fiperadar.site/monitorar',
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
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Consultar Veículos",
                "item": "https://www.fiperadar.site"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Monitorar Veículos",
                "item": "https://www.fiperadar.site/monitorar"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <MonitorarView />
        </>
    );
}
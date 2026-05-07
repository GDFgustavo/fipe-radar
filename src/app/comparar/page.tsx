import { Metadata } from "next"
import CompararView from "./CompararView"

export const metadata: Metadata = {
    title: 'Comparar Veículos e Preços | Qual veículo vale mais a pena?',
    description: 'Compare preços de diferentes modelos lado a lado. Analise qual veículo mantém melhor o valor e faça a escolha financeira mais inteligente',
    alternates: {
        canonical: 'https://www.fiperadar.site/comparar',
    },
    openGraph: {
        title: 'Qual veículo vale mais a pena?. Compare agora!',
        description: 'Coloque modelos lado a lado e compare a variação de preços e desvalorização na Tabela FIPE',
        url: 'https://www.fiperadar.site/comparar',
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
                "name": "Comparar Veículos",
                "item": "https://www.fiperadar.site/comparar"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <CompararView />
        </>
    );
}

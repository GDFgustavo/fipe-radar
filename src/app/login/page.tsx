import { Metadata } from 'next';
import LoginView from './LoginView';

export const metadata: Metadata = {
    title: 'FIPE Radar | Login',
    description: 'Faça login no FIPE Radar para gerenciar seus alertas de preços.',
    alternates: {
        canonical: 'https://www.fiperadar.site/login',
    },
    openGraph: {
        title: 'Acesse o FIPE Radar e gerencie seus alertas',
        description: 'Faça login para acompanhar a variação de preço dos seus veículos favoritos na Tabela FIPE.',
        url: 'https://www.fiperadar.site/login',
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
    robots: {
        index: true,
        follow: false,
    },
};

export default function Page() {
    return <LoginView />
}
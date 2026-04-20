import { useMemo } from 'react';

// Tipagem para os itens do histórico (ajuste conforme seu types/vehicle)
interface PriceHistoryItem {
    month: string;
    price: string;
}

export function useFipeVariation(priceHistory: PriceHistoryItem[] | undefined) {
    const variation = useMemo(() => {
        // 1. Validação inicial
        if (!priceHistory || priceHistory.length < 2) return null;

        const parsePrice = (priceStr: string) => {
            const cleanValue = priceStr.replace(/\D/g, '');
            return Number(cleanValue) / 100;
        };

        try {
            // 2. Pegamos os pontos de comparação
            const current = priceHistory[0];
            const lastInPeriod = priceHistory[2] || priceHistory[priceHistory.length - 1];

            const precoAtual = parsePrice(current.price);
            const precoAntigo = parsePrice(lastInPeriod.price);

            // 3. Cálculo
            const diferenca = precoAtual - precoAntigo;
            const subiu = diferenca >= 0;

            // 4. Formatação
            const valorFormatado = Math.abs(diferenca).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            return {
                texto: valorFormatado,
                isPositive: subiu,
                sinal: subiu ? '+' : '-'
            };
        } catch (error) {
            console.error("Erro ao calcular variação:", error);
            return null;
        }
    }, [priceHistory]); // Só recalcula se o array de histórico mudar

    return variation;
}
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFipeForm } from "@/hooks/useFipeForm";
import { createClient } from "@/utils/supabase/client";

const MIN_VALUE = 1000;

export function useMonitoringForm(user: any, onRequireAuth: () => void) {
    const fipe = useFipeForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();
    const nextRoute = useMemo(() => searchParams.get('redirect') || '/meus-monitoramentos', [searchParams]);

    const [priceTrend, setPriceTrend] = useState<"up" | "down">('up');
    const [targetPrice, setTargetPrice] = useState<number>(MIN_VALUE);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' });

    const brandName = fipe.brands?.find(b => b.code === fipe.brand)?.name;
    const modelName = fipe.models?.find(m => m.code === fipe.model)?.name;
    const yearName = fipe.years?.find(y => y.code === fipe.year)?.name;

    useEffect(() => {
        if (!statusMsg.text) return;
        const timer = setTimeout(() => setStatusMsg({ type: null, text: '' }), 7000);
        return () => clearTimeout(timer);
    }, [statusMsg.text]);

    useEffect(() => {
        const params = {
            vehicleType: searchParams.get("vehicleType"),
            brand: searchParams.get("brand"),
            model: searchParams.get("model"),
            year: searchParams.get("year"),
            price: searchParams.get("targetPrice"),
            trend: searchParams.get("priceTrend") as "up" | "down"
        };

        if (params.vehicleType) fipe.onVehicleChange(params.vehicleType);
        if (params.brand) fipe.onBrandChange(params.brand);
        if (params.model) fipe.onModelChange(params.model);
        if (params.year) fipe.onYearChange(params.year);
        if (params.price) setTargetPrice(Number(params.price));
        if (params.trend) setPriceTrend(params.trend);

        if (params.vehicleType && params.brand && params.model && params.year && user) {
            router.replace("/monitorar");
        }
    }, [searchParams, user]);

    const parseCurrencyToNumber = (rawPrice?: string): number => {
        if (!rawPrice) return 0;
        return parseFloat(rawPrice.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
    };

    const handleCreateMonitoring = async () => {
    if (!user) {
        const url = fipe.brand
            ? `/monitorar?vehicleType=${fipe.vehicleType || ''}&brand=${fipe.brand || ''}&model=${fipe.model || ''}&year=${fipe.year || ''}&targetPrice=${targetPrice}&priceTrend=${priceTrend}`
            : '/monitorar';

        router.replace(url);
        onRequireAuth();
        return;
    }

        if (!fipe.brand || !fipe.model || !fipe.year || !targetPrice) {
            setStatusMsg({ type: 'error', text: 'Preencha todos os campos corretamente.' });
            return;
        }

        setLoading(true);
        setStatusMsg({ type: null, text: '' });

        try {
            const fipeDetails = await fipe.onSubmit();
            const numericCurrentPrice = parseCurrencyToNumber(fipeDetails?.price);

            if (numericCurrentPrice === 0) throw new Error("Não foi possível obter o preço atual.");

            const { error: dbError } = await supabase.from('price_alerts').insert([{
                vehicle_type: fipe.vehicleType,
                brand: fipe.brand,
                brand_name: brandName,
                model: fipe.model,
                model_name: modelName,
                year: fipe.year,
                year_name: yearName,
                target_price: targetPrice,
                current_price: numericCurrentPrice,
                price_trend: priceTrend,
                email: user.email.toLowerCase().trim(),
                email_sent: false,
                is_confirmed: true,
                user_id: user.id
            }]);

            if (dbError) throw new Error(dbError.message);

            setStatusMsg({ type: 'success', text: 'Monitoramento criado com sucesso!' });
            fipe.resetForm();
            setTargetPrice(MIN_VALUE);
            router.push(nextRoute);
            router.refresh();
        } catch (err: any) {
            const errorMessage = err.message?.includes('Limite de monitoramentos')
                ? "Você atingiu o limite de 3 monitoramentos permitidos."
                : (err.message || 'Erro ao criar monitoramento.');
            setStatusMsg({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return {
        fipe,
        email: user?.email ?? '',
        priceTrend,
        setPriceTrend,
        targetPrice,
        setTargetPrice,
        loading,
        statusMsg,
        handleCreateMonitoring,
        MIN_VALUE
    };
}
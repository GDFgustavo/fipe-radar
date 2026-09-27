import { Suspense } from "react";
import MyMonitoringView from "./MyMonitoringView";
import { createClient } from '@/utils/supabase/server';
import MyMonitoringsLoading from "./loading";

export default async function Page({ searchParams }: { searchParams: Promise<{ ordem?: string }> }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const urlParams = await searchParams
    const ordenacao = urlParams?.ordem === 'asc' ? true : false

    let monitoramentos = [];
    let totais = { atingidas: 0, emAndamento: 0 };

    if (user) {
        const { data, error } = await supabase
            .from('price_alerts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: ordenacao });

        if (!error && data) {
            monitoramentos = data;

            totais = data.reduce((acc, item) => {
                if (item.status === 'reached') acc.atingidas += 1;
                else acc.emAndamento += 1;
                return acc;
            }, { atingidas: 0, emAndamento: 0 });
        }
    }
    return (
        <Suspense fallback={<MyMonitoringsLoading />}>
            <MyMonitoringView
                user={user}
                monitoramentos={monitoramentos}
                totais={totais} />
        </Suspense>
    )
}
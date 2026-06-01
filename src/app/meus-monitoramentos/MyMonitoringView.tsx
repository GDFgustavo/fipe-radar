import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Bell, CheckCircle2, Clock, Plus } from 'lucide-react';

import { MyMonitoringCard } from './MyMonitoringCard';
import { Filter } from './Filter';
import { Button } from '@/components/Button';
import { MonitoringLimit } from './MonitoringLimit';

import { createClient } from '@/utils/supabase/server';
import styles from './MyMonitorings.module.scss';

export interface MyMonitoringViewProps {
    searchParams: Promise<{ ordem?: string }>
}

export default async function MyMonitoringView({ searchParams }: MyMonitoringViewProps) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const urlParams = await searchParams
    const ordenacao = urlParams?.ordem === 'asc' ? true : false

    if (!user) {
        redirect('/login')
    }

    const { data: monitoramentos, error } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: ordenacao })

    if (error) {
        console.error('Erro ao buscar monitoramentos:', error.message)
    }

    const totais = monitoramentos?.reduce(
        (acc, item) => {
            if (item.email_sent) {
                acc.atingidas += 1
            } else {
                acc.emAndamento += 1
            }
            return acc
        },
        { atingidas: 0, emAndamento: 0 }
    ) || { atingidas: 0, emAndamento: 0 }

    return (
        <div className={styles.container}>
            <header className={styles.pageHeader}>
                <div>
                    <h1>Meus Monitoramentos</h1>
                    <p>Acompanhe a variação de preço da tabela FIPE</p>
                </div>
                <div className={styles.btn}>
                    {!monitoramentos || monitoramentos.length === 0 ? '' : (
                        <Link href='/monitorar'>
                            <Button icon={Plus} textButton="Novo Monitoramento" />
                        </Link>
                    )}
                </div>
            </header>

            <section className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.iconCircle}>
                        <Bell size={24} />
                    </div>
                    <div className={styles.statText}>
                        <span>Total</span>
                        <strong>{monitoramentos?.length}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={`${styles.iconCircle} ${styles.green}`}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div className={styles.statText}>
                        <span>Metas Atingidas</span>
                        <strong>{totais.atingidas}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.iconCircle}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statText}>
                        <span>Em Monitoramento</span>
                        <strong>{totais.emAndamento}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <MonitoringLimit currentCount={monitoramentos?.length} />
                </div>
            </section>

            <section>
                <div className={styles.filterContainer}>
                    <Filter />
                </div>
            </section>

            {!monitoramentos || monitoramentos.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>Você ainda não está monitorando nenhum veículo.</p>
                    <div>
                        <Link href='/monitorar'>
                            <Button icon={Plus} textButton="Novo Monitoramento" />
                        </Link>
                    </div>
                </div>
            ) : (
                <section className={styles.listSection}>
                    {monitoramentos.map((item) => (
                        <MyMonitoringCard key={item.id} item={item} />
                    ))}
                </section>
            )}
        </div>
    );
}
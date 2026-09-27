"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { MonitoringCard } from './_components/MonitoringCard';
import { Filter } from './_components/Filter';
import { Button } from '@/components/Button';
import { EmptyState } from './_components/EmptyState';
import { Drawer } from '@/components/Drawer';
import { MonitoringForm } from '@/components/MonitoringForm';

import styles from './MyMonitoring.module.scss';

export interface MyMonitoringViewProps {
    user: any;
    monitoramentos: any[];
    totais: { atingidas: number; emAndamento: number };
}

export default function MyMonitoringView({ user, monitoramentos, totais }: MyMonitoringViewProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const monitoringFormId = "monitoring-form";

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Meus Monitoramentos</h1>
                    <p>Acompanhe a variação de preço da tabela FIPE</p>
                </div>
                <div className={styles.btn}>
                    {!monitoramentos || monitoramentos.length === 0 ? '' : (
                        <Button icon={Plus} textButton="Novo Monitoramento" onClick={() => setIsDrawerOpen(true)} />
                    )}
                </div>
            </div>

            <section className={styles.compactStatsBar}>
                <div className={styles.statGroup}>
                    <div className={styles.statItem}>
                        <strong>{totais.emAndamento}</strong>
                        <span>{totais.emAndamento === 1 ? 'ativo' : 'ativos'}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <strong>{totais.atingidas}</strong>
                        <span>{totais.atingidas === 1 ? 'atingido' : 'atingidos'}</span>
                    </div>
                </div>

                <div className={styles.statItem}>
                    <strong>{monitoramentos?.length || 0} de 3</strong>
                    <span>usados</span>
                </div>
            </section>

            <section>
                <div className={styles.filterContainer}>
                    {!monitoramentos || monitoramentos.length === 0 ? '' : <Filter />}
                </div>
            </section>

            {!monitoramentos || monitoramentos.length === 0 ? (
                <EmptyState onClick={() => setIsDrawerOpen(true)} />

            ) : (
                <section className={styles.listSection}>
                    {monitoramentos.map((item) => (
                        <MonitoringCard key={item.id} item={item} />
                    ))}
                </section>
            )}

            <div className={styles.section}>
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    title="Criar Monitoramento"
                    subtitle='Configure seu alerta de preços em poucos passos'
                    footer={
                        <Button
                            textButton={"Iniciar Monitoramento"}
                            form={monitoringFormId}
                        />
                    }
                >
                    <MonitoringForm formId={monitoringFormId} user={user} onRequireAuth={() => undefined} />
                </Drawer>
            </div>

        </div>
    );
}
"use client"

import { useCallback, useEffect, useState } from "react"
import styles from './Comparar.module.scss'
import { useFipeForm } from "@/hooks/useFipeForm"
import { useRouter, useSearchParams } from "next/navigation"
import { VehicleDetails } from "@/types/vehicle"
import { AddVehicleCard } from "@/components/AddVehicleCard"
import { EmptySlot } from "@/components/EmptySlot"
import { VehicleCard } from "@/components/VehicleCard"
import { ApiErrorMessage } from "@/components/ApiErrorMensage"

type ComparisonSlotProps = {
    vehicle: VehicleDetails | null
    onAdd: (v: VehicleDetails) => boolean
    onRemove: () => void
    isLoadingInitial?: boolean
}

function ComparisonSlot({ vehicle, onAdd, onRemove, isLoadingInitial }: ComparisonSlotProps) {
    const fipe = useFipeForm();
    const [isAdding, setIsAdding] = useState(false);
    const isActuallyLoading = isLoadingInitial || fipe.isDetailsLoading;

    const handleFormSubmit = async () => {
        const vehicleData = await fipe.onSubmit();
        if (vehicleData) {
            const success = onAdd(vehicleData);
            if (success) {
                setIsAdding(false);
            }
            fipe.resetForm();
        }
    };

    if (isActuallyLoading || vehicle) {
        return (
            <VehicleCard
                vehicle={vehicle}
                onRemove={onRemove}
                isLoading={isActuallyLoading}
            />
        );
    }

    if (isAdding) {
        return (
            <AddVehicleCard
                fipe={fipe}
                onCancel={() => setIsAdding(false)}
                onSubmit={handleFormSubmit}
            />
        );
    }

    return <EmptySlot onClick={() => setIsAdding(true)} />;
}

export default function CompararPage() {
    const fipeAuto = useFipeForm();
    const { hasError, dismissError, refetchAll } = fipeAuto
    const router = useRouter();
    const searchParams = useSearchParams();
    const [vehicles, setVehicles] = useState<(VehicleDetails | null)[]>([null, null, null]);
    const [error, setError] = useState('')

    const updateSlot = useCallback((index: number, newVehicle: VehicleDetails | null) => {
        if (!newVehicle) {
            setVehicles(prev => { const v = [...prev]; v[index] = null; return v; });
            return true;
        }

        const isDuplicate = vehicles.some((v, i) =>
            i !== index &&
            v?.codeFipe === newVehicle.codeFipe &&
            v?.modelYear === newVehicle.modelYear
        );

        if (isDuplicate) {
            setError('Este veículo já foi adicionado.');
            setTimeout(() => setError(''), 3000);
            return false;
        }

        setVehicles(prev => {
            const updated = [...prev];
            updated[index] = newVehicle;
            return updated;
        });
        return true;
    }, [vehicles]);

    useEffect(() => {
        const type = searchParams.get("vehicleType");
        const brand = searchParams.get("brand");
        const model = searchParams.get("model");
        const year = searchParams.get("year");

        if (type && brand && model && year) {
            fipeAuto.fillForm(type, brand, model, year);
            router.replace("/comparar");
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (fipeAuto.details) {
            const timer = setTimeout(() => {
                updateSlot(0, fipeAuto.details!);
                fipeAuto.resetForm();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [fipeAuto.details, updateSlot, fipeAuto]);

    return (
        <div className={styles.section}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Compare Veículos
                    </h1>
                    <p className={styles.subtitle}>
                        Adicione até 3 veículos e compare seus valores FIPE lado a lado.
                    </p>
                </div>

                {hasError && (
                    <div style={{ marginBottom: '2rem' }}>
                        <ApiErrorMessage onRetry={refetchAll} onDismiss={dismissError} />
                    </div>
                )}

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}
                <div className={styles.grid}>
                    {vehicles.map((vehicle, index) => (
                        <ComparisonSlot
                            key={index}
                            vehicle={vehicle}
                            onAdd={(v) => updateSlot(index, v)}
                            onRemove={() => updateSlot(index, null)}
                            isLoadingInitial={index === 0 && (fipeAuto.isDetailsLoading || !!fipeAuto.details)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}
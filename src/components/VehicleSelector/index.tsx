"use client"

import SelectCustom from "../ui/select";
import styles from "./VehicleSelector.module.scss"

import { Bike, Car, Truck } from "lucide-react";

interface VehicleSelectorProps {
    layout?: 'horizontal' | 'vertical'
    vehicleType?: string
}

export function VehicleSelector({ layout = 'horizontal', vehicleType }: VehicleSelectorProps) {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <label className={styles.label}>Tipo de Veículo</label>
                <div className={styles.typeGrid}>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'cars' ? styles.typeButtonActive : ''
                            }`}
                    >
                        <Car className={styles.typeIcon} />
                        Carros
                    </button>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'motorcycles' ? styles.typeButtonActive : ''
                            }`}
                    >
                        <Bike className={styles.typeIcon} />
                        Motos
                    </button>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'trucks' ? styles.typeButtonActive : ''
                            }`}
                    >
                        <Truck className={styles.typeIcon} />
                        Caminhões
                    </button>
                </div>
            </div>

            <div className={layout === 'vertical' ? styles.verticalGrid : styles.selectGrid}>
                <div className={styles.field}>
                    <label className={styles.label}>Marca</label>
                    <SelectCustom
                        instanceId="brand-select"
                        placeholder="Selecionar"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Modelo</label>
                    <SelectCustom
                        instanceId="model-select"
                        placeholder="Selecionar"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Ano</label>
                    <SelectCustom
                        instanceId="year-select"
                        placeholder="Selecionar"
                    />
                </div>
            </div>
        </div>
    )
}

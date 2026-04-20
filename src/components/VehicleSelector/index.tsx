"use client"

import { Brand, Model, Year } from "@/types/vehicle";
import SelectCustom from "../ui/select";
import styles from "./VehicleSelector.module.scss"
import { Bike, Car, Truck } from "lucide-react";

interface VehicleSelectorProps {
    layout?: 'horizontal' | 'vertical'
    vehicleType: string
    brand: string | null
    model: string | null
    year: string | null

    brands?: Brand[]
    models?: Model[]
    years?: Year[]

    onVehicleChange: (value: string) => void
    onBrandChange: (value: string) => void
    onModelChange: (value: string) => void
    onYearChange: (value: string) => void
}

export function VehicleSelector({ layout = 'horizontal',
    vehicleType,
    brand,
    model,
    year,
    brands,
    models,
    years,
    onVehicleChange,
    onBrandChange,
    onModelChange,
    onYearChange }: VehicleSelectorProps) {
    function mapOptions(data?: { code: string; name: string }[]) {
        return data?.map(item => ({
            value: item.code,
            label: item.name
        })) ?? []
    }

    const brandOptions = mapOptions(brands)
    const modelOptions = mapOptions(models)
    const yearOptions = mapOptions(years)

    const selectedBrand =
        brandOptions.find(option => option.value === brand) ?? null

    const selectedModel =
        modelOptions.find(option => option.value === model) ?? null

    const selectedYear =
        yearOptions.find(option => option.value === year) ?? null

    return (

        <div className={styles.container}>
            <div className={styles.section}>
                <label className={styles.label}>Tipo de Veículo</label>
                <div className={styles.typeGrid}>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'cars' ? styles.typeButtonActive : ''
                            }`}
                        onClick={() => onVehicleChange("cars")}
                    >
                        <Car className={styles.typeIcon} />
                        Carros
                    </button>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'motorcycles' ? styles.typeButtonActive : ''
                            }`}
                        onClick={() => onVehicleChange("motorcycles")}
                    >
                        <Bike className={styles.typeIcon} />
                        Motos
                    </button>
                    <button
                        className={`${styles.typeButton} ${vehicleType === 'trucks' ? styles.typeButtonActive : ''
                            }`}
                        onClick={() => onVehicleChange("trucks")}
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
                        value={selectedBrand}
                        onChange={(option) =>
                            onBrandChange(option?.value ?? "")
                        }
                        options={brandOptions}
                        placeholder="Selecionar"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Modelo</label>
                    <SelectCustom
                        instanceId="model-select"
                        value={selectedModel}
                        onChange={(option) =>
                            onModelChange(option?.value ?? "")
                        }
                        options={modelOptions}
                        placeholder="Selecionar"
                        isDisabled={!brand}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Ano</label>
                    <SelectCustom
                        instanceId="year-select"
                        value={selectedYear}
                        onChange={(option) =>
                            onYearChange(option?.value ?? "")
                        }
                        options={yearOptions}
                        placeholder="Selecionar"
                        isDisabled={!model}
                    />
                </div>
            </div>
        </div>
    )
}

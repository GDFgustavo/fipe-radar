"use client"

import { X, Car, Calendar, Tag, Fuel, Bike, Truck } from "lucide-react"
import { VehicleDetails } from "@/types/vehicle"
import styles from "./VehicleCard.module.scss"
import { Spinner } from "../ui/Spinner"

type Props = {
    vehicle?: VehicleDetails | null
    onRemove: () => void
    isLoading?: boolean
}

export function VehicleCard({ vehicle, onRemove, isLoading }: Props) {
    const typeIcon = () => {
        if (vehicle?.vehicleType === 'cars') {
            return <Car />
        }
        if (vehicle?.vehicleType === 'trucks') {
            return <Truck />
        }
        if (vehicle?.vehicleType === 'motorcycles') {
            return <Bike />
        }
    }

    if (isLoading || !vehicle) {
        return (
            <div className={styles.vehicleCard}>
                <div className={styles.spinnerWrapper}>
                    <Spinner />
                    <p>Buscando dados...</p>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.vehicleCard}>
            <div className={styles.removeButton}>
                <button
                    className={styles.removeIcon}
                    onClick={() => onRemove()}
                >
                    <X />
                </button>
            </div>

            <div className={styles.cardHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.iconWrapper}>
                        <p className={styles.typeIcon}>
                            {typeIcon()}
                        </p>
                    </div>

                    <div>
                        <div className={styles.cardTitle}>
                            {vehicle.brand}
                        </div>
                        <p className={styles.cardSubtitle}>
                            {vehicle.model}
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.priceSection}>
                    <p className={styles.priceLabel}>Valor FIPE</p>
                    <p className={styles.priceValue}>
                        {vehicle.price}
                    </p>
                </div>

                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                            <Calendar className={styles.detailIcon} />
                            Ano
                        </span>
                        <span className={styles.detailValue}>
                            {vehicle.modelYear}
                        </span>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                            <Tag className={styles.detailIcon} />
                            Código FIPE
                        </span>
                        <span className={styles.detailValue}>
                            {vehicle.codeFipe}
                        </span>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                            <Fuel className={styles.detailIcon} />
                            Combustível
                        </span>
                        <span className={styles.detailValue}>
                            {vehicle.fuel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
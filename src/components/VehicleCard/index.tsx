"use client"

import { X, Calendar, Tag, Fuel } from "lucide-react"
import { VehicleDetails } from "@/types/vehicle"
import styles from "./VehicleCard.module.scss"
import { Spinner } from "../ui/Spinner"
import { getVehicleIcon } from "@/utils/vehicleIcon"

type Props = {
    vehicle?: VehicleDetails | null
    onRemove: () => void
    isLoading?: boolean
}

export function VehicleCard({ vehicle, onRemove, isLoading }: Props) {
    const icon = getVehicleIcon(vehicle?.vehicleType);

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
                            {icon}
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
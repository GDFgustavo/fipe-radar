"use client"

import { X } from "lucide-react"
import { VehicleSelector } from "@/components/VehicleSelector"
import { Button } from "@/components/Button"
import styles from "./AddVehicleCard.module.scss"

type Props = {
  fipe: any
  onCancel: () => void
  onSubmit: () => void
}

export function AddVehicleCard({ fipe, onCancel, onSubmit }: Props) {
  return (
    <div className={styles.addCard}>
      <div className={styles.cardHeader}>
        <div className={styles.addHeader}>
          <div className={styles.cardTitle}>
            Adicionar Veículo
          </div>

          <div className={styles.removeButton}>
            <button
              className={styles.removeIcon}
              onClick={onCancel}
            >
              <X />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.addContent}>
        <VehicleSelector {...fipe} layout="vertical" />

        <Button
          textButton="Adicionar ao Comparativo"
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}
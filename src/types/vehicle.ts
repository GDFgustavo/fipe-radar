import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export interface VehicleType {
    code: string
    name: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export interface Brand {
    code: string
    name: string
}

export interface Model {
    code: string
    name: string
}

export interface Year {
    code: string
    name: string
}

export interface VehicleDetails {
    vehicleType: string
    brand: string
    brandCode: string
    model: string
    modelCode: string
    year: string
    yearCode: string
    modelYear: string
    price: string
    fuel: string
    codeFipe: string
    referenceMonth: string
}

export interface VehicleHistory {
    priceHistory: {
        month: string
        price: string
    }[]
}
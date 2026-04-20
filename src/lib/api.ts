import { VehicleType, Brand, Model, Year, VehicleDetails, VehicleHistory } from '@/types/vehicle'
import { Car, Bike, Truck } from "lucide-react"

const apiKey = process.env.NEXT_PUBLIC_API_FIPE_KEY
const apiUrl = process.env.NEXT_PUBLIC_API_FIPE_BASE_URL

const fetchFipeData = async (url: string) => {
    const response = await fetch(`${apiUrl}${url}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error("Erro ao buscar dados da FIPE")
    }

    return response.json()
}

export async function fetchVehicleTypes(): Promise<VehicleType[]> {
    return [
        { code: 'cars', name: 'Carros', icon: Car },
        { code: 'motorcycles', name: 'Motos', icon: Bike },
        { code: 'trucks', name: 'Caminhões', icon: Truck },
    ]
}

export async function fetchBrands(vehicleType: string): Promise<Brand[]> {
    return fetchFipeData(`/${vehicleType}/brands`)
}

export async function fetchModels(vehicleType: string, brandCode: string): Promise<Model[]> {
    return fetchFipeData(`/${vehicleType}/brands/${brandCode}/models`)
}

export async function fetchYears(vehicleType: string, brandCode: string, modelCode: string): Promise<Year[]> {
    return fetchFipeData(`/${vehicleType}/brands/${brandCode}/models/${modelCode}/years`)
}

export async function fetchVehicleDetails(
    vehicleType: string,
    brandCode: string,
    modelCode: string,
    yearCode: string,
): Promise<VehicleDetails> {

    const data = await fetchFipeData(
        `/${vehicleType}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
    )

    return {
        ...data,
        vehicleType,
        brandCode,
        modelCode,
        yearCode,
    }
}

export async function fetchVehicleHistory(
    vehicleType: string,
    fipeCode: string,
    yearId: string
): Promise<VehicleHistory> {
    return fetchFipeData(
        `/${vehicleType}/${fipeCode}/years/${yearId}/history`
    )
}
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleTypes, fetchBrands, fetchModels, fetchYears, fetchVehicleDetails, fetchVehicleHistory } from "@/lib/api"

export function useVehicleTypes() {
    return useQuery({
        queryKey: ["vehicleTypes"],
        queryFn: fetchVehicleTypes,
    })
}

export function useBrands(vehiclesType: string) {
    return useQuery({
        queryKey: ["brands", vehiclesType],
        queryFn: () => fetchBrands(vehiclesType),
        enabled: !!vehiclesType,
        retry: 2,
    })
}

export function useModels(vehiclesType: string, brands: string) {
    return useQuery({
        queryKey: ["models", vehiclesType, brands],
        queryFn: () => fetchModels(vehiclesType, brands),
        enabled: !!vehiclesType && !!brands,
        retry: 2,
    })
}

export function useYears(vehiclesType: string, brands: string, models: string) {
    return useQuery({
        queryKey: ["years", vehiclesType, brands, models],
        queryFn: () => fetchYears(vehiclesType, brands, models),
        enabled: !!vehiclesType && !!brands && !!models,
        retry: 2,
    })
}

export function useFipeDetails(vehiclesType: string, brands: string, models: string, years: string, enabled: boolean) {
    return useQuery({
        queryKey: ["fipeDetails", vehiclesType, brands, models, years],
        queryFn: () => fetchVehicleDetails(vehiclesType, brands, models, years),
        enabled: enabled && !!vehiclesType && !!brands && !!models && !!years,
        retry: 1,
    })
}

export function useFipeHistory(
    vehicleType: string,
    fipeCode: string,
    yearId: string
) {
    return useQuery({
        queryKey: ['fipeHistory', vehicleType, fipeCode, yearId],
        queryFn: () =>
            fetchVehicleHistory(vehicleType, fipeCode, yearId),
        enabled: !!vehicleType && !!fipeCode && !!yearId,
        retry: 1,
    })
}
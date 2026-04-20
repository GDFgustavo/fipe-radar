import { useState } from "react";
import { useBrands, useModels, useYears, useFipeDetails, useFipeHistory, useVehicleTypes } from "./useFipe";

export function useFipeForm() {
    const [vehicleType, setVehicleType] = useState<string>("cars")
    const [brand, setBrand] = useState<string | null>(null)
    const [model, setModel] = useState<string | null>(null)
    const [year, setYear] = useState<string | null>(null)
    const [shouldFetch, setShouldFetch] = useState(false)
    const [isErrorDismissed, setIsErrorDismissed] = useState(false)

    const { data: vehicle } = useVehicleTypes()
    const { data: brands, isLoading: isBrandsLoading, isError: isBrandsError, refetch: refetchBrands } = useBrands(vehicleType)
    const { data: models, isLoading: isModelsLoading, isError: isModelsError, refetch: refetchModels } = useModels(vehicleType, brand ?? "")
    const { data: years, isLoading: isYearsLoading, isError: isYearsError, refetch: refetchYears } = useYears(vehicleType, brand ?? "", model ?? "")
    const { data: details, isLoading: isDetailsLoading, isError: isDetailsError, refetch: refetchDetails } = useFipeDetails(vehicleType, brand ?? "", model ?? "", year ?? "", shouldFetch)
    const { data: history } = useFipeHistory(
        vehicleType,
        shouldFetch ? details?.codeFipe ?? "" : "",
        shouldFetch ? year ?? "" : ""
    )

    const hasError = (isBrandsError || isModelsError || isYearsError || isDetailsError) && !isErrorDismissed;

    const isLoadingAny = isBrandsLoading || isModelsLoading || isYearsLoading || isDetailsLoading

    const refetchAll = () => {
        setIsErrorDismissed(false);
        refetchBrands();
        refetchModels();
        refetchYears();
        refetchDetails();
    }

    const dismissError = () => {
        setIsErrorDismissed(true);
    }

    const handleVehicleChange = (type: string) => {
        setVehicleType(type)
        setBrand(null)
        setModel(null)
        setYear(null)
        setShouldFetch(false)
    }

    const handleBrandChange = (brandCode: string) => {
        setBrand(brandCode)
        setModel(null)
        setYear(null)
        setShouldFetch(false)
    }

    const handleModelChange = (modelCode: string) => {
        setModel(modelCode)
        setYear(null)
        setShouldFetch(false)
    }

    const handleYearChange = (yearCode: string) => {
        setYear(yearCode)
        setShouldFetch(false)
    }

    const handleSubmit = async () => {
        if (brand && model && year) {
            setShouldFetch(true);
            const result = await refetchDetails();
            return result.data;
        }
        return null;
    }

    const fillForm = (type: string, b: string, m: string, y: string) => {
        setVehicleType(type);
        setBrand(b);
        setModel(m);
        setYear(y);
        setShouldFetch(true);
    };

    const resetForm = () => {
        setVehicleType("cars")
        setBrand(null)
        setModel(null)
        setYear(null)
        setShouldFetch(false)
        setIsErrorDismissed(false)
    }

    return {
        vehicleType,
        vehicle,
        brand,
        model,
        year,
        brands,
        models,
        years,
        details,
        history,
        isBrandsLoading,
        isDetailsLoading,
        isLoadingAny,
        hasError,
        onVehicleChange: handleVehicleChange,
        onBrandChange: handleBrandChange,
        onModelChange: handleModelChange,
        onYearChange: handleYearChange,
        onSubmit: handleSubmit,
        fillForm,
        resetForm,
        refetchAll,
        dismissError
    }
}
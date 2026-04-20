import { create } from 'zustand'
import { VehicleDetails } from '@/types/vehicle'

interface VehicleStore {
    lastResult: VehicleDetails | null;
    setLastResult: (v: VehicleDetails | null) => void;
    clearLastResult: () => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
    lastResult: null,
    setLastResult: (v) => set({ lastResult: v }),
    clearLastResult: () => set({ lastResult: null }),
}))
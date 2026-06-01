import { Car, Truck, Bike } from "lucide-react";

export const getVehicleIcon = (type: any) => {
        const cleanType = String(type || '').trim().toLowerCase();

        const iconMap: Record<string, React.ReactNode> = {
                cars: <Car />,
                trucks: <Truck />,
                motorcycles: <Bike />,
        };

        return iconMap[cleanType] || null;
};

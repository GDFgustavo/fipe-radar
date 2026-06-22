"use client";

import Marquee from "react-fast-marquee";
import { useBrands } from "@/hooks/useFipe";
import styles from "./BrandScrolling.module.scss";

interface brandScrollingProps {
    onSelect: (type: string, brandCode: string) => void;
}

export default function BrandScrolling({ onSelect }: brandScrollingProps) {
    const { data: cars, isLoading: carsLoading } = useBrands("cars");
    const { data: motos, isLoading: motosLoading } = useBrands("motorcycles");
    const { data: trucks, isLoading: trucksLoading } = useBrands("trucks");

    const allBrands = [
        ...(cars?.map(b => ({ ...b, type: "cars" })) || []),
        ...(motos?.map(b => ({ ...b, type: "motorcycles" })) || []),
        ...(trucks?.map(b => ({ ...b, type: "trucks" })) || [])
    ];

    const isLoading = carsLoading || motosLoading || trucksLoading || !allBrands.length;

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.skeletonTrack}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className={styles.brandCardSkeleton} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Marquee speed={25} gradient gradientColor="var(--background)" gradientWidth="clamp(30px, 8vw, 190px)" pauseOnHover>
                {allBrands.map((brand, index) => (
                    <button
                        key={`${brand.code}-${index}`}
                        className={styles.brandCard}
                        onClick={() => onSelect(brand.type, brand.code)}
                    >
                        <span className={styles.brandName}>{brand.name}</span>
                    </button>
                ))}
            </Marquee>
        </div>
    );
}
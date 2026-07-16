'use client'

import Image from "next/image";
import styles from "./Hero.module.scss";

export function Hero() {
    return (
        <>
            <div className={styles.heroBackground}>
                <Image
                    src="/bg-mobile.png"
                    alt="Background FIPE Mobile"
                    fill
                    priority
                    className={styles.bgMobile}
                />
                <Image
                    src="/bg.png"
                    alt="Background FIPE Desktop"
                    fill
                    priority
                    className={styles.bgDesktop}
                />

                <div className={styles.heroOverlay}></div>
            </div>

            <div className={styles.floatingGraphic}>
                <Image
                    src="/tab.svg"
                    alt="Gráficos Decorativos FIPE"
                    width={1920}
                    height={820}
                    priority
                />
            </div>
        </>
    );
}
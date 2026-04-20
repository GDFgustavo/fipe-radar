"use client"

import Link from "next/link"
import { Car, BarChart3, Target, Menu, X } from "lucide-react"
import { useState } from "react"
import styles from "./Header.module.scss"
import Image from "next/image"
import logo from '../../../public/fipe-logo.svg'
import { usePathname } from "next/navigation"

const navigation = [
    { name: "Consulta", href: "/", icon: Car },
    { name: "Comparar", href: "/comparar", icon: BarChart3 },
    { name: "Monitorar", href: "/monitorar", icon: Target },
]

export function Header() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image src={logo} alt="Fipe Radar Logo" className={styles.logoSvg} priority />
                    </div>
                    <span className={styles.logoText}>
                        FIPE Radar
                    </span>
                </Link>

                <nav className={styles.navDesktop}>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.name} href={item.href} className={`${styles.navButton} ${isActive ? styles.active : styles.navHover}`}>
                                <item.icon className={styles.icon} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <button
                    className={styles.mobileButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className={styles.iconLarge} />
                    ) : (
                        <Menu className={styles.iconLarge} />
                    )}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <nav className={styles.navMobile}>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`${styles.navButton} ${isActive ? styles.active : styles.navHover}`}
                                >
                                    <item.icon className={styles.icon} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </header>
    )
}

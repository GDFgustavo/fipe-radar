"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, BarChart3, Menu, X, BellRing, Radar } from "lucide-react"

import { UserNav } from "../UserNav"
import { ThemeToggle } from "../ThemeToggle"

import logo from '../../../public/fipe-logo.svg'
import styles from "./Header.module.scss"

const navigation = [
    { name: "Consulta", href: "/", icon: Car },
    { name: "Comparar", href: "/comparar", icon: BarChart3 },
    { name: "Monitorar", href: "/monitorar", icon: Radar },
    { name: "Meus Monitoramentos", href: "/meus-monitoramentos", icon: BellRing, mobileOnly: true }
]

export function Header() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    const [currentPath, setCurrentPath] = useState(pathname)
    const lastScrollY = useRef(0)

    if (pathname !== currentPath) {
        setCurrentPath(pathname)
        setMobileMenuOpen(false)
        setIsVisible(true)
    }

    const routesWithSmartScroll = [""]
    const isSmartRoute = routesWithSmartScroll.includes(pathname)

    useEffect(() => {
        if (isSmartRoute) return

        const controlNavbar = () => {
            const currentScrollY = window.scrollY

            if (mobileMenuOpen) {
                setMobileMenuOpen(false)
                lastScrollY.current = currentScrollY
                return
            }

            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", controlNavbar, { passive: true })
        return () => window.removeEventListener("scroll", controlNavbar)

    }, [isSmartRoute, mobileMenuOpen])

    return (
        <header className={`${styles.header} ${!isVisible ? styles.hidden : ""}`}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image src={logo} alt="Fipe Radar Logo" className={styles.logoSvg} priority />
                    </div>
                    <span className={styles.logoText}>FIPE Radar</span>
                </Link>

                <nav className={styles.navDesktop}>
                    {navigation
                        .filter((item) => !item.mobileOnly)
                        .map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.name} href={item.href} className={`${styles.navButton} ${isActive ? styles.active : styles.navHover}`}>
                                    <item.icon className={styles.icon} />
                                    {item.name}
                                </Link>
                            )
                        })}
                </nav>

                <div className={styles.userNav}>
                    <UserNav isNavbarVisible={isVisible} />
                    <ThemeToggle />
                </div>

                <button className={styles.mobileButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className={styles.iconLarge} /> : <Menu className={styles.iconLarge} />}
                </button>
            </div>

            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.isOpen : ''}`}>
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
                    <UserNav isMobile={true} />
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}
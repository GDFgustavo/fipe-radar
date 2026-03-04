import Link from "next/link"
import styles from "./Footer.module.scss"
import Image from "next/image"
import logo from '../../../public/fipe-logo.svg'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.grid}>
                    <div className={styles.brandSection}>
                        <Link href="/" className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <Image src={logo} alt="Fipe Radar Logo" className={styles.logoSvg} />
                            </div>
                            <span className={styles.logoText}>
                                FIPE Radar
                            </span>
                        </Link>

                        <p className={styles.description}>
                            Consulte os valores atualizados da Tabela FIPE para carros, motos
                            e caminhões. Compare veículos e monitore preços para tomar
                            decisões mais inteligentes.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Navegação</h3>
                        <ul className={styles.list}>
                            <li>
                                <Link href="/" className={styles.link}>
                                    Consulta FIPE
                                </Link>
                            </li>
                            <li>
                                <Link href="/comparar" className={styles.link}>
                                    Comparar Veículos
                                </Link>
                            </li>
                            <li>
                                <Link href="/monitorar" className={styles.link}>
                                    Monitorar Preços
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Informações</h3>
                        <ul className={styles.list}>
                            <li className={styles.text}>
                                Dados atualizados mensalmente
                            </li>
                            <li className={styles.text}>
                                Fonte: Tabela FIPE
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        {new Date().getFullYear()} FIPE Radar. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

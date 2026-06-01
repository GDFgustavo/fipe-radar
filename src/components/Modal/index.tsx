import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, Bell, CheckCircle2, X } from "lucide-react";

import { Button } from "@/components/Button";
import styles from "./Modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    const searchParams = useSearchParams();

    const currentParams = searchParams.toString();

    const returnPath = currentParams ? `/monitorar?${currentParams}` : "/monitorar";

    const loginUrl = `/login?redirect=${encodeURIComponent(returnPath)}`;
    const cadastroUrl = `/cadastro?redirect=${encodeURIComponent(returnPath)}`;

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>

                <header className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <Bell size={32} />
                    </div>
                    <h2>Crie sua conta gratuita</h2>
                    <p>
                        Para monitorar preços e receber alertas, você precisa de uma conta.
                    </p>
                </header>

                <div className={styles.actions}>
                    <Link href={loginUrl} className={styles.linkBlock}>
                        <Button icon={LogIn} textButton="Fazer Login" />
                    </Link>

                    <Link href={cadastroUrl} className={styles.linkBlock}>
                        <button className={styles.btnOutline}>
                            Criar Conta Grátis
                        </button>
                    </Link>
                </div>

                <div className={styles.featuresBox}>
                    <ul>
                        <li>
                            <CheckCircle2 size={18} />
                            <span>Alertas Direto no E-Mail</span>
                        </li>
                        <li>
                            <CheckCircle2 size={18} />
                            <span>Preço Alvo Inteligente</span>
                        </li>
                        <li>
                            <CheckCircle2 size={18} />
                            <span>Monitore em Segundos</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useLockScroll } from "@/hooks/useLockScroll";
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
    useLockScroll(isOpen)

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>

                <header className={styles.header}>
                    <div>
                        <h2>Entre para criar monitoramentos</h2>

                        <p>
                            Crie uma conta ou entre para salvar seus alertas
                            e acompanhar as variações de preço.
                        </p>
                    </div>
                </header>

                <div className={styles.featuresBox}>
                    <ul>
                        <li>Receba alertas direto no seu e-mail</li>
                        <li>Acompanhe seus monitoramentos em um só lugar</li>
                        <li>Cadastro gratuito</li>
                    </ul>
                </div>

                <div className={styles.actions}>
                    <Link
                        href={cadastroUrl}
                        className={styles.btnPrimary}
                    >
                        Criar conta
                    </Link>

                    <p className={styles.loginText}>
                        Já tem uma conta?&nbsp;
                        <Link href={loginUrl}>
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
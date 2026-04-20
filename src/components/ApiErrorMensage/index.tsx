import { AlertTriangle, RefreshCw, X } from "lucide-react";
import styles from "./ApiErrorMessage.module.scss";

interface ApiErrorMessageProps {
    onRetry?: () => void;
    onDismiss?: () => void;
}

export function ApiErrorMessage({ onRetry, onDismiss }: ApiErrorMessageProps) {
    return (
        <div className={styles.errorSection}>
            <div className={styles.errorContainer}>
                <div className={styles.alertDestructive}>
                    <div className={styles.alertHeader}>
                        <AlertTriangle className={styles.alertIcon} />
                        <h3 className={styles.alertTitle}>Falha na Conexão</h3>
                    </div>

                    <div className={styles.alertDescription}>
                        <p className={styles.errorText}>
                            Não foi possível conectar ao servidor da Tabela FIPE. O serviço pode estar temporariamente indisponível ou sua conexão com a internet pode estar instável.
                        </p>

                        <div className={styles.errorActions}>
                            <button
                                onClick={onRetry}
                                className={styles.btnPrimary}
                            >
                                <RefreshCw size={16} />
                                Tentar Novamente
                            </button>

                            <button
                                onClick={onDismiss}
                                className={styles.btnOutline}
                            >
                                <X size={16} />
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
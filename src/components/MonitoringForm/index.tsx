import { ArrowDown, ArrowUp } from "lucide-react";
import { NumericFormat } from "react-number-format";

import { ApiErrorMessage } from "@/components/ApiErrorMensage";
import { VehicleSelector } from "@/components/VehicleSelector";
import { useMonitoringForm } from "@/hooks/useMonitoringForm";

import styles from "./MonitoringForm.module.scss";

interface MonitoringFormProps {
    user: any;
    onRequireAuth: () => void;
    formId?: string;
}

export function MonitoringForm({
    user,
    onRequireAuth,
    formId = "monitoring-form",
}: MonitoringFormProps) {
    const {
        fipe,
        email,
        priceTrend,
        setPriceTrend,
        targetPrice,
        setTargetPrice,
        statusMsg,
        handleCreateMonitoring,
        MIN_VALUE,
    } = useMonitoringForm(user, onRequireAuth);

    const handleSubmit = async (
        event: React.SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        await handleCreateMonitoring();
    };

    return (
        <form
            id={formId}
            onSubmit={handleSubmit}
            className={styles.form}
        >
            {fipe.hasError && (
                <div className={styles.apiError}>
                    <ApiErrorMessage
                        onRetry={fipe.refetchAll}
                        onDismiss={fipe.dismissError}
                    />
                </div>
            )}

            <div className={styles.monitorGrid}>
                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <h2>Detalhes do veículo</h2>
                    </div>
                    <VehicleSelector {...fipe} />
                </div>

                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <h2>Preço alvo&nbsp;
                            <span>
                                (Mínimo: R$ 1.000)
                            </span>
                        </h2>
                    </div>

                    <div className={styles.inputWrapper}>
                        <span className={styles.prefix}>R$</span>

                        <NumericFormat
                            value={targetPrice}
                            onValueChange={(values) =>
                                setTargetPrice(Number(values.value))
                            }
                            onBlur={() =>
                                targetPrice < MIN_VALUE &&
                                setTargetPrice(MIN_VALUE)
                            }
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={0}
                            allowNegative={false}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <h2>Notificações</h2>
                    </div>

                    <label className={styles.label}>
                        {priceTrend === "up"
                            ? 'Você será notificado quando o preço atingir ou ultrapassar o valor alvo.'
                            : 'Você será notificado quando o preço atingir ou ficar abaixo do valor alvo.'}
                    </label>

                    <div className={styles.trendButtons}>
                        <button
                            type="button"
                            className={`${styles.trendButton} ${priceTrend === "up"
                                ? styles.trendUp
                                : ""
                                }`}
                            onClick={() => setPriceTrend("up")}
                        >
                            <ArrowUp size={16} />
                            Aumentar preço
                        </button>

                        <button
                            type="button"
                            className={`${styles.trendButton} ${priceTrend === "down"
                                ? styles.trendDown
                                : ""
                                }`}
                            onClick={() => setPriceTrend("down")}
                        >
                            <ArrowDown size={16} />
                            Diminuir preço
                        </button>
                    </div>
                </div>

                <div className={styles.field}>
                    <div className={styles.cardSubtitle}>
                        <h2>Endereço eletrônico</h2>
                    </div>

                    <label className={styles.label}>
                        Enviaremos os alertas para este e-mail
                    </label>

                    <input
                        type="email"
                        value={user ? email : ""}
                        placeholder={
                            user
                                ? "Insira seu email"
                                : "Vinculado ao e-mail da sua conta"
                        }
                        className={styles.input}
                        disabled
                    />
                </div>
            </div>

            {statusMsg.text && (
                <div className={styles.statusMsg}>
                    <p
                        className={
                            statusMsg.type === "success"
                                ? styles.success
                                : styles.error
                        }
                    >
                        {statusMsg.text}
                    </p>
                </div>
            )}
        </form>
    );
}
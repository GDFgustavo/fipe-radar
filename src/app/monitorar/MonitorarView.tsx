import Image from "next/image";
import { Plus } from "lucide-react";

import monitoringCreate from "../../../public/monitoring-create.png";
import monitoringActive from "../../../public/monitoring-active.png";
import monitoringAlert from "../../../public/monitoring-alert.png";

import { Button } from "@/components/Button";
import styles from "./Monitorar.module.scss";

export default function MonitorarView() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>

                <div className={styles.cards}>
                    <article className={`${styles.card} ${styles.cardOne}`}>
                        <div className={styles.cardOneContent}>
                            <h2>
                                Configure seu&nbsp;
                                <br />
                                monitoramento.
                            </h2>
                            <p>
                                Selecione marca, modelo, ano e informe o
                                preço que deseja acompanhar.
                            </p>

                            <span className={styles.detail}>
                                <Button textButton="Novo monitoramento" icon={Plus} />
                            </span>
                        </div>

                        <div className={styles.cardOneImage}>
                            <Image
                                src={monitoringCreate}
                                alt="Criação de um monitoramento"
                                priority
                                sizes="(max-width: 820px) 80vw, 52vw"
                            />
                        </div>
                    </article>

                    <article className={`${styles.card} ${styles.cardTwo}`}>
                        <div className={styles.cardTwoContent}>
                            <h2>
                                Acompanhe o preço&nbsp;
                                <br />
                                sem precisar consultar todos os dias.
                            </h2>
                            <p>
                                Veja o valor atual, sua meta e quanto falta para
                                o veículo chegar ao preço desejado.
                            </p>
                        </div>

                        <div className={styles.cardTwoImage}>
                            <Image
                                src={monitoringActive}
                                alt="Acompanhamento do preço do veículo"
                                sizes="(max-width: 600px) 86vw, 58vw"
                            />
                        </div>
                    </article>

                    <article className={`${styles.card} ${styles.cardThree}`}>
                        <div className={styles.cardThreeContent}>
                            <h2>
                                Saiba quando&nbsp;
                                <br />
                                chegar a hora certa.
                            </h2>
                            <p>
                                Quando o valor atingir sua meta, você
                                recebe o aviso direto no seu e-mail.
                            </p>
                        </div>

                        <div className={styles.cardThreeImage}>
                            <Image
                                src={monitoringAlert}
                                alt="Alerta enviado ao atingir o preço desejado"
                                sizes="(max-width: 820px) 84vw, 42vw"
                            />
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { Link, useHistory } from 'react-router-dom';
import { cancelOrder, checkIfPaid, OrderStatus } from '../../services/vinterleirService';
import { deleteAllCookies, setCookie } from '../../services/cookieService';
import styles from './registration.module.css';
import { Steps } from "../../models/steps";

export function Done(props: { orderId: string}) {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Du er herved registrert til vinterleir!</h2>
            <p>Tusen takk for at du deltar på vinterleir, vi gleder oss til å se deg der!</p>
            <p>Du skal nå ha fått en epost som bekreftelse.</p>
            <p>Din ordreid på Vipps er: {props.orderId}.</p>

            <p>For endringer eller avbestilling ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

interface CheckVippsPaymentProps {
    orderId: string;
}

function CheckVippsPayment(props: CheckVippsPaymentProps) {
    const [loading, setLoading] = useState(true);
    const [didNotPay, setDidNotPay] = useState(false);
    const [rejected, setRejected] = useState(false);

    const [error, setError] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if(props.orderId == null) {
            throw Error("Ingen ordreid???");
        }

        checkAttempt();
    }, [])

    function checkAttempt(attempts: number = 0) {
        if(attempts === 30) {
            setError(true);
            deleteAllCookies();
            return;
        }
        checkIfPaid(props.orderId).then((ok) => {
            if(ok === OrderStatus.Reserved) {
                deleteAllCookies();
                setLoading(false);
            }
            else if(ok === OrderStatus.Rejected || ok === OrderStatus.Reserve_Failed) {
                setRejected(true);
                setLoading(false);
            }
            else if(ok === OrderStatus.Cancelled) {
                setDidNotPay(true);
                setLoading(false);
            }
            else {
                setTimeout(() => {
                    checkAttempt(attempts+1);
                }, 2000);
            }

        })
        .catch((err) => {
            console.log(`Didn't make it ${err.toString()}`);
            setTimeout(() => {
                checkAttempt(attempts+1);
            }, 1700);
        });
    }

    function cancel() {
        deleteAllCookies();
        history.push("/")
    }

    function tryAgain() {
        cancelOrder(props.orderId);
        setCookie("vinterleir_registrering_step", Steps.Payment, 3);
        history.push("/vinterleiretterregistrering");
    }

    if(rejected) {
        return (
            <div>
                <div className={styles.done}>
                    <h1>Registrering til vinterleir</h1>
                    <h2>Vipps orderen ble avslått av Vipps. Ingen penger har blitt reservert eller belastet.</h2>
                    <p>Sannsynligvis er kortet du bruker i Vipps avslått eller noe i den duren.</p>
                    <p>Hvis dette er feil, ta kontakt med oss og legg ved ordrenummeret under:</p>
                    <h2>Ordrenr: {props.orderId}</h2>
                    <p>Hvis du vil prøve igjen eller kontant, velg prøv igjen.</p>
                    <p><a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
                </div>
                <div className={`${styles.doneNoPayButtons}`}>
                    <button className={styles.backButton} onClick={cancel}>Avbryt</button>
                    <button className={styles.nextButton} onClick={tryAgain}>Prøv igjen</button>
                </div>

            </div>

        )
    }

    if(didNotPay) {
        return (
            <div>
                <div className={styles.done}>
                    <h1>Registrering til vinterleir</h1>
                    <h2>Vipps orderen ble kansellert. Ingen penger har blitt reservert.</h2>
                    <p>Hvis dette er feil, ta kontakt med oss og legg ved ordrenummeret under:</p>
                    <h2>Ordrenr: {props.orderId}</h2>
                    <p>Hvis du vil prøve igjen, velg prøv igjen.</p>
                    <p><a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
                </div>
                <div className={`${styles.doneNoPayButtons}`}>
                    <button className={styles.backButton} onClick={cancel}>Avbryt</button>
                    <button className={styles.nextButton} onClick={tryAgain}>Prøv igjen</button>
                </div>

            </div>

        )
    }

    if(error) {
        return (
            <div className={styles.done}>
                <h1>Registrering til vinterleir</h1>
                <h2>Beklager! Noe gikk galt når vi registrerte deg.</h2>
                <p>Det er mulig at det likevel gikk igjennom, så hvis du fikk en epost bekreftelse ta kontakt med oss.</p>
                <p>Din ordreId: {props.orderId}</p>
                <p><a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
                <Link to={"/"}><button>Tilbake til forsiden</button></Link>
            </div>
        )
    }

    if(loading) {
        return <Loading loading={loading} />;
    }

    return (
        <div className={styles.done}>
            <h1>Registrering til vinterleir</h1>
            <Done orderId={props.orderId}/>
        </div>
    )
}

export default CheckVippsPayment;
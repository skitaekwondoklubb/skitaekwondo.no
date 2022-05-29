import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { Link, useHistory } from 'react-router-dom';
import { cancelOrder, checkIfPaid } from '../../services/graderingService';
import { deleteAllCookies, setCookie } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';
import { SimpleSteps } from "../../models/simplesteps";

export function Done() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Du er herved registrert til gradering!</h2>
            <p>Lykke til!</p>
            <p>Du skal nå ha fått en epost som bekreftelse.</p>
            <p>For endringer eller avbestilling ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

interface CheckGraderingVippsPaymentProps {
    orderId: string;
}

function CheckGraderingVippsPayment(props: CheckGraderingVippsPaymentProps) {
    const [loading, setLoading] = useState(true);
    const [didNotPay, setDidNotPay] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if(props.orderId == null) {
            throw Error("Ingen ordreid???");
        }

        checkAttempt();
    }, [])

    function checkAttempt(attempts: number = 0) {
        console.log(attempts);
        if(attempts === 30) {
            setError(true);
            deleteAllCookies();
            return;
        }
        checkIfPaid(props.orderId).then((ok) => {
            if(ok) {
                setLoading(false);
                deleteAllCookies();
            }
            else {
                if(attempts === 25) {
                    setDidNotPay(true);
                    setLoading(false);
                    return;
                }
                setTimeout(() => {
                    checkAttempt(attempts+1);
                }, 1700);
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
        setCookie("simple_registrering_step", SimpleSteps.Payment, 3);
        history.push("/graderingregistrering");
    }

    if(didNotPay) {
        return (
            <div>
                <div className={styles.done}>
                    <h1>Registrering til gradering</h1>
                    <h2>Vipps ordre ble ikke betalt.</h2>
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
                <h1>Registrering til gradering</h1>
                <h2>Beklager! Noe gikk galt når vi registrerte deg.</h2>
                <p>Det er godt mulig at det likevel gikk igjennom, så hvis du fikk en epost bekreftelse ta kontakt med oss.</p>
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
            <h1>Registrering til gradering</h1>
            <Done/>
        </div>
    )
}

export default CheckGraderingVippsPayment;
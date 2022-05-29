
import { useState } from "react";
import styles from '../registrering/registration.module.css';
import Loading from '../loading/loading';
import { sendGraderingRegistration } from "../../services/graderingService";
import { SimpleStepProps, SimpleSteps } from "../../models/simplesteps";

interface SimplePaymentProps extends SimpleStepProps {
    total: number;
    goBack: () => void;
}

export function SimplePayLater(props: SimplePaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function nextStep() {
        setLoading(true);
        sendGraderingRegistration(props.registration).then((success: boolean) => {
            if(success) {
                props.setCurrentStep(SimpleSteps.Done);
            }
        })
        .catch((err: Error) => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    if(loading) {
        <h2>Registrerer, vennligst vent...</h2>
    }

    return (
        <div className="slideLeft">
            <div className={styles.error} hidden={error === ""}>
                <h2>Oisann! Noe gikk galt når vi prøvde å registrere deg.</h2>
                <p>Prøv igjen senere eller ta kontakt med oss på <a href="mailto: kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a>.</p>
                
                <details>
                    <summary>Teknisk feilmelding:</summary>
                    <small>{error}</small>
                </details>
            </div>
            <h2>Betaling med kort er på gradering.</h2>
            <p>Betaling med kort skjer når du møter på gradering.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
        </div>
    )
}
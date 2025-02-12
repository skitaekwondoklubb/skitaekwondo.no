import { useState } from 'react';
import { NewMemberStepProps, NewMemberSteps } from '../../models/simplesteps';
import { sendNewMemberRegistration } from '../../services/newmemberService';
import styles from '../registrering/registration.module.css';
import Loading from '../loading/loading';

function NewMemberReceiptStep(props: NewMemberStepProps) {
    const [loading, setLoading] = useState(false);

    function goBack() {
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        setLoading(true);
        sendNewMemberRegistration(props.registration)
        .then((x) => {
            setLoading(false);
            if(x === "Done") {
                props.setCurrentStep(NewMemberSteps.Done);
            }
        })
    }

    return (
        <div className="slideLeft">
            {loading && <Loading loading={loading} />}
            <div className={styles.receiptForm}>
                <div className={`${styles.largeSpan} ${styles.centerize} ${styles.receipt}`}>
                    <h2>Utøver:</h2>
                </div>
                <div className={`${styles.centerize} ${styles.receipt}`}>
                    <h3>Navn på utøver</h3>
                    <p>{props.registration.firstName} {props.registration.lastName}</p>
                </div>
                <div className={` ${styles.centerize} ${styles.receipt}`}>
                    <h3>Alder på utøver</h3>
                    <p>{props.registration.age} år</p>
                </div>

                <div className={`${styles.largeSpan}`}>
                    <hr />
                </div>

                <div className={`${styles.largeSpan} ${styles.centerize} ${styles.receipt}`}>
                    <h2>Kontaktinformasjon:</h2>
                </div>

                <div className={`${styles.centerize} ${styles.receipt}`}>
                    <h3>Navn {props.registration.age < 18 && ` til foresatt`}:</h3>
                    <p>{props.registration.parentFirstName} {props.registration.parentLastName}</p>
                </div>
                <div className={`${styles.centerize} ${styles.receipt}`}>
                    <h3>E-postadresse:</h3>
                    <p>{props.registration.email}</p>
                </div>
                <div className={`${styles.centerize} ${styles.receipt} ${styles.largeSpan}`}>
                    <h3>Telefon:</h3>
                    <p>{props.registration.telephone}</p>
                </div>
            </div> 
            
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    onClick={nextStep}>Registrer</button>
            </div>
        </div>
    )
}

export default NewMemberReceiptStep;
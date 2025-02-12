import { useEffect, useState } from 'react';
import { SkoleStepProps, SkoleSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { sendSkoleRegistration } from '../../services/skoleService';

function SkoleReceiptStep(props: SkoleStepProps) {
    function goBack() {
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        sendSkoleRegistration(props.registration)
        .then((x) => {
            if(x === "Done") {
                props.setCurrentStep(SkoleSteps.Done);
            }
        })
    }

    return (
        <div className="slideLeft">
            <div className={styles.receiptForm}>
                <div className={`${styles.largeSpan} ${styles.centerize} ${styles.receipt}`}>
                    <h2>Deltaker:</h2>
                </div>
                <div className={`${styles.centerize} ${styles.receipt}`}>
                    <h3>Navn på deltaker</h3>
                    <p>{props.registration.firstName} {props.registration.lastName}</p>
                </div>
                <div className={` ${styles.centerize} ${styles.receipt}`}>
                    <h3>Alder på deltaker</h3>
                    <p>{props.registration.age} år</p>
                </div>
                <div className={`${styles.centerize} ${styles.receipt} ${styles.largeSpan}`}>
                    <h3>Medlem i Ski Taekwondo Klubb</h3>
                    <p>{props.registration.isMember ? "Ja" : "Nei"}</p>
                </div> 

                <div className={`${styles.largeSpan}`}>
                    <hr />
                </div>

                <div className={`${styles.largeSpan} ${styles.centerize} ${styles.receipt}`}>
                    <h2>Foresatt:</h2>
                </div>

                <div className={`${styles.centerize} ${styles.receipt}`}>
                    <h3>Navn på foresatt:</h3>
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

                <div className={`${styles.largeSpan}`}>
                    <hr />
                </div>

                <div className={`${styles.centerize} ${styles.receipt} ${styles.largeSpan}`}>
                    <h3>Ønsker å delta:</h3>
                    <ul>
                        {props.registration.firstDay && <li>Onsdag 14. august</li>}
                        {props.registration.secondDay && <li>Torsdag 15. august</li>}
                        {props.registration.thirdDay && <li>Fredag 16. august</li>}
                    </ul>
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

export default SkoleReceiptStep;
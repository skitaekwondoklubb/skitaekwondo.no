import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function Sleepover(props: StepProps) {
    const isSkiTaekwondoKlubb = props.registration?.club ? props.registration.club.startsWith("Ski Taekwondo") : false
    const [sleepover, setSleepover] = useState(props.registration.sleepover);

    function save() {
        let registration = {... props.registration};
        registration.sleepover = sleepover;

        props.setRegistration(registration);
    }

    function goBack() {
        save();
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        save();
        if(typeof(props.nextStep) === "number") {
            props.setCurrentStep(props.nextStep);
        }
    }

    return (
        <div className="slideLeft">
            <h3 hidden={!isSkiTaekwondoKlubb}><b>Utøvere i Ski Taekwondo Klubb får ikke sove i dojangen.</b></h3>
            <p>Overnatting i salen er gratis for alle utøvere, men krever egne sovesaker slik som for eksempel sovepose, madrass eller lignende.</p>
            <div className={`${styles.registrationForm}`} >
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={(x) => { isSkiTaekwondoKlubb ? setSleepover(false) : setSleepover(!sleepover); }} >
                    <input disabled={isSkiTaekwondoKlubb} 
                        type={"checkbox"} checked={sleepover} 
                        onChange={(x) => setSleepover(x.currentTarget.checked)}
                    />
                    <span>Jeg ønsker å overnatte i salen</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Sleepover;
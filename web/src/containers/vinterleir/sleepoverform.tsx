import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function Sleepover(props: StepProps) {
    const isSkiTaekwondoKlubb = props.registration.club.startsWith("Ski Taekwondo");
    const [sleepover, setSleepover] = useState(props.registration.sleepover);

    function save() {
        let registration = {... props.registration};
        registration.sleepover = sleepover;

        props.setRegistration(registration);
    }

    function goBack() {
        save();
        props.setCurrentStep(Steps.ClubGrade);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.Ledsager);
    }

    return (
        <div className="slideLeft">
            <p hidden={!isSkiTaekwondoKlubb}><b>Utøvere i Ski Taekwondo Klubb må være minst 12 år for å kunne overnatte i salen.</b></p>
            <p>Overnatting i salen er gratis for alle utøvere, men krever egne sovesaker slik som for eksempel sovepose, madrass eller lignende.</p>
            <div className={`${styles.registrationForm}`} >
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setSleepover(!sleepover)}>
                    <input disabled={isSkiTaekwondoKlubb && props.registration.age < 12} 
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
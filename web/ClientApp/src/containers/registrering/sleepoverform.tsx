import { useEffect, useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function Sleepover(props: StepProps) {
    const isSkiTaekwondoKlubb = props.registration?.clubId === 29;
    const cantSleepOver = isSkiTaekwondoKlubb && props.registration.age != null && props.registration.age < 12;
    const [sleepover, setSleepover] = useState(props.registration.sleepover);

    useEffect(() => {
        if(cantSleepOver) {
            setSleepover(false);
        }
    })

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
            <p>Overnatting i salen er gratis for alle utøvere, men krever egne sovesaker slik som for eksempel sovepose, madrass eller lignende.</p>
            <h3 hidden={!cantSleepOver}>
                <b>Barn i Ski Taekwondo Klubb får dessverre ikke lov til å sove i hallen.</b>
            </h3>
            <div className={`${styles.registrationForm}`} >
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={(x) => { cantSleepOver ? setSleepover(false) : setSleepover(!sleepover); }} >
                    <input disabled={cantSleepOver} 
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
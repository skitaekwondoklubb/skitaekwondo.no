import { useState } from "react";
import styles from './registration.module.css';
import { StepProps } from "../../models/steps";

function TeoriForm(props: StepProps) {
    const [theory, setTheory] = useState(props.registration.theory ? props.registration.theory : false);
    const [physical, setPhysical] = useState(props.registration.physical ? props.registration.physical : false);

    function save() {
        let registration = {... props.registration};
        registration.theory = theory;
        registration.physical = physical;

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
            <p>Skal du ta fysisk test eller teori under arrangementet?.</p>
            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setTheory(!theory)}>
                    <input type={"checkbox"} checked={theory} onChange={x => setTheory(x.currentTarget.checked)}/>
                    <span>Jeg skal ta teoriprøve</span>
                </div>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setPhysical(!physical)}>
                    <input type={"checkbox"} checked={physical} onChange={x => setPhysical(x.currentTarget.checked)}/>
                    <span>Jeg skal ta fysisk test</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default TeoriForm;
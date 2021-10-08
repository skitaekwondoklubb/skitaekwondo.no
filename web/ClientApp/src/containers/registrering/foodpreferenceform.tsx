import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function FoodPreference(props: StepProps) {
    const [isVegan, setIsVegan] = useState(props.registration.vegan);

    function save() {
        let registration = {... props.registration};
        registration.vegan = isVegan;

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
            <p>Er du vegetarianer, veganer eller lignende? Ved å vite dette kan vi passe på å ha alternativer til deg på matbordene.</p>

            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setIsVegan(!isVegan)}>
                <input type="checkbox" checked={isVegan} onChange={x => setIsVegan(x.currentTarget.checked)} />
                    <span>Jeg er vegetarianer/veganer</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default FoodPreference;
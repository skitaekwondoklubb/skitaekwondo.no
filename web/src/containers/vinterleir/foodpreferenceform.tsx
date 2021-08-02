import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function FoodPreference(props: StepProps) {
    const [isVegan, setIsVegan] = useState(false);

    function save() {
        let registration = {... props.registration};
        registration.vegan = isVegan;

        props.setRegistration(registration);
    }
    
    function goBack() {
        save();
        props.setCurrentStep(Steps.Allergies);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.OtherInformation);
    }

    return (
        <div className="slideLeft">
            <p>Er du vegetarianer, veganer eller lignende? Ved å vite dette kan vi passe på å ha alternativer til deg på matbordene.</p>

            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setIsVegan(!isVegan)}>
                <input type="checkbox" checked={isVegan} onChange={x => setIsVegan(x.currentTarget.checked)} />
                    <p>Jeg er vegetarianer/veganer</p>
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
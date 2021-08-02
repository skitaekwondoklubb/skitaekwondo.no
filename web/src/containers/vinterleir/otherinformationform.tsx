import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function OtherInformation(props: StepProps) {
    const [otherInfo, setOtherInfo] = useState("");

    function save() {
        let registration = {... props.registration};
        registration.otherInfo = otherInfo;

        props.setRegistration(registration);
    }
    
    function goBack() {
        save();
        props.setCurrentStep(Steps.FoodPreference);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.Payment);
    }


    return (
        <div className="slideLeft">
            <p>Dersom det er annen informasjon vi trenger å vite kan dette skrives i tekstfeltet under:</p>
            <textarea  className={styles.freeText} value={otherInfo} onChange={(x) => setOtherInfo(x.currentTarget.value)} />

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default OtherInformation;
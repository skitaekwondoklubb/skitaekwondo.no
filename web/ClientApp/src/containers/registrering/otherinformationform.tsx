import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function OtherInformation(props: StepProps) {
    const [otherInfo, setOtherInfo] = useState(props.registration.otherInfo);

    function save() {
        let registration = {... props.registration};
        registration.otherInfo = otherInfo;

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
            <p>Dersom det er annen informasjon vi trenger å vite kan dette skrives i tekstfeltet under.</p>
            <p>Vi tar bilder under arrangementer til bruk på nettsiden, Facebook o.l. Dersom du ikke ønsker at du/ditt barn skal bli tatt bilde av må du skrive det i feltet.</p>
            <p hidden={props.registration.grade == null || props.registration.grade?.dan === false || props.registration.grade.grade < 4}>
                <b>Hvis du som master er interessert i å instruere på vinterleir, skriv det gjerne under.</b>
            </p>
            <textarea  className={styles.freeText} value={otherInfo} onChange={(x) => setOtherInfo(x.currentTarget.value)} />

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default OtherInformation;
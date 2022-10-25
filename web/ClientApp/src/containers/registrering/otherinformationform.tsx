import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function OtherInformation(props: StepProps) {
    const [otherInfo, setOtherInfo] = useState(props.registration.otherInfo);
    const [wantsToInstruct, setWantsToInstruct] = useState(false);

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
            <p>Hvis det er annen informasjon vi trenger å vite om, kan dette skrives i tekstfeltet under.</p>
            <p>Vi tar bilder under arrangementer til bruk på nettsiden, Facebook o.l. Dersom du ikke ønsker at du/ditt barn skal bli tatt bilde av må du skrive det i feltet.</p>
            <div hidden={props.registration.gradeId < 17}>
                <p>Siden du er master har du mulighet til å instruere under vinterleir dersom det blir nødvendig. </p>
                <div className={`${styles.instructBox} ${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setWantsToInstruct(!wantsToInstruct)}>
                    <input type="checkbox" checked={wantsToInstruct} onChange={x => setWantsToInstruct(x.currentTarget.checked)} />
                    <span>Jeg ønsker å instruere under vinterleir dersom det blir nødvendig.</span>
                </div>

            </div>
            <textarea  className={styles.freeText} value={otherInfo} onChange={(x) => setOtherInfo(x.currentTarget.value)} />

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default OtherInformation;
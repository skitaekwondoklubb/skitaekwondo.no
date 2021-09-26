import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function Allergies(props: StepProps) {
    const [allergies, setAllergies] = useState("");

    function save() {
        let registration = {... props.registration};
        registration.allergies = allergies;

        props.setRegistration(registration);
    }
    
    function goBack() {
        save();
        
        if(props.registration.hasLedsager) {
            props.setCurrentStep(Steps.LedsagerManagement);
        }
        else {
            if(typeof(props.prevStep) === "number") {
                props.setCurrentStep(props.prevStep);
            }
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
            <p>Matallergier er noe Ski Taekwondo Klubb tar seriøst. Vi passer på at det er et alternativ for deg til alle måltider.</p>
            <p>Skriv også ned eventuelle andre viktige allergier vi må vite om i tilfelle nødsituasjoner.</p>
            <p>Hvis man ikke har allergier eller det kun er milde/irrelevante allergier, kan feltet under forbli tomt.</p>
            <textarea className={styles.freeText} value={allergies} onChange={(x) => setAllergies(x.currentTarget.value)} />

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Allergies;
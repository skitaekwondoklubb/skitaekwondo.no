import { useState } from "react";
import styles from './registration.module.css';
import { Ledsager } from "../../services/vinterleirService";
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function LedsagerManagement(props: StepProps) {
    const [ledsagere, setLedsagere] = useState<Ledsager[]>(props.registration.ledsagere);

    function removeLedsager(firstName: string) {
        setLedsagere(ledsagere.filter(x => x.firstName !== firstName));
    }

    function save() {
        let registration = {... props.registration};
        registration.ledsagere = ledsagere;

        props.setRegistration(registration);
    }

    function addNewLedsager() {
        save();
        props.setCurrentStep(Steps.LedsagerAdd);
    }

    function goBack() {
        save();
        props.setCurrentStep(Steps.Ledsager);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.Allergies);
    }

    return (
        <div className="slideLeft">
            <div className={styles.ledsagereForm}>
                {
                    ledsagere.map((ledsager) => {
                        return (
                            <div className={styles.ledsagerRow}>
                                <span>{ledsager.firstName} {ledsager.lastName}</span>
                                <button onClick={() => removeLedsager(ledsager.firstName)}>Slett</button>
                            </div>
                        )
                    })
                }
                <button className={styles.addLedsagerButton} onClick={addNewLedsager}>Legg til ledsager</button>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} disabled={ledsagere.length < 1} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default LedsagerManagement;
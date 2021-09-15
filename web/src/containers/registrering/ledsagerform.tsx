import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function Ledsager(props: StepProps) {
    const [hasLedsager, setHasLedsager] = useState(props.registration.hasLedsager);

    function save() {
        let registration = {... props.registration};
        registration.hasLedsager = hasLedsager;

        if(!hasLedsager) {
            registration.ledsagere = []; // Remove ledsagere if they have added those, but change their mind.
        }

        props.setRegistration(registration);
    }

    function goBack() {
        save()
        props.setCurrentStep(Steps.Sleepover);
    }

    function nextStep() {
        save();

        if(hasLedsager) {
            props.setCurrentStep(Steps.LedsagerManagement);
        }
        else {
            props.setCurrentStep(Steps.Allergies);
        }
    }

    return (
        <div className="slideLeft">
            <p>Ledsagere er egne foreldere, foresatte eller annen ansvarlig som vil være sammen med utøver under hele vinterleiren og
                ønsker overnatting, frokost, lunsj og/eller middag.</p>
            <p>På grunn av denne kostnaden vil ledsagere måtte betale slik som utøvere. Dette vil dermed bli lagt til i prisen til slutt.</p>
            <p><b>Foreldre eller andre som kun ønsker å se på, men <u>ikke</u> skal ha frokost, lunsj, middag eller overnatting trenger ikke oppføres.</b></p>
            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setHasLedsager(!hasLedsager)}>
                    <input type={"checkbox"} checked={hasLedsager} onChange={x => setHasLedsager(x.currentTarget.checked)}/>
                    <span>Utøver har egen ledsager</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Ledsager;
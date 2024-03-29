import { useEffect, useState } from "react";
import styles from './registration.module.css';
import { StepProps } from "../../models/steps";

function Gradering(props: StepProps) {
    const [gradering, setGradering] = useState(props.registration.gradering);
    const isCup = props.registration.gradeId < 14;
    const isSki = props.registration.clubId === 29;

    useEffect(() => {
        if(!isSki || (props.registration.age > 12 && isCup)) {
            setGradering(false);
        }
    }, [])

    function save() {
        let registration = {... props.registration};
        registration.gradering = gradering;

        props.setRegistration(registration);
    }

    function goBack() {
        save()
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

    if(!isSki && isCup) {

        return (
            <div className="slideLeft">
                <p>Gradering på leieren er dessverre kun for Ski Taekwondo Klubb.</p>
                <div className={styles.registrationForm}>
                    <div className={`${styles.largeSpan} ${styles.checkboxLine}`}>
                        <input type={"checkbox"} disabled={true} checked={gradering} onChange={x => {setGradering(false)}}/>
                        <span>Ønsker gradering</span>
                    </div>
                </div>
                <div className={styles.navigationButtons}>
                    <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                    <button className={styles.nextButton} onClick={nextStep}>Neste</button>
                </div>
            </div>
        )
    }

    return (
        <div className="slideLeft">
            <p>Ønsker du å prøve å gradere på vinterleiren?</p>
            <p hidden={!isCup}>Gradering koster 350,- og tar plass på søndag for cup.</p>
            <div hidden={isCup}>
                <p><b>VIKTIG: Du må selv kontakte og betale TTU for dangradering!</b></p>
                <p>Dangradering tar plass på fredag.</p>
                <p>Takstein, planker o.l, tas hånd om av oss, huk av dersom du skal dangradere.</p>
            </div>
            <div hidden={!isCup || props.registration.age < 13}>
                <p><b>Det vil ikke være cupgradering på vinterleiren for ungdom/voksne. </b></p>
                {
                    isSki &&
                    <p>Ski Taekwondo Klubb vil ha gradering for ungdom/voksne i januar 2023.</p>
                }
            </div>
            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => {
                    if(!isCup || (isCup && props.registration.age < 13)) {
                        setGradering(!gradering);
                    }
                } }>
                    <input type={"checkbox"} disabled={isCup && props.registration.age > 12} checked={gradering} onChange={x => setGradering(x.currentTarget.checked)}/>
                    <span>Ønsker gradering</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Gradering;
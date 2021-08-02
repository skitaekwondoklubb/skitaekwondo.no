import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function EmailTelephone(props: StepProps) {
    const [email, setEmail] = useState(props.registration.email);
    const [telephone, setTelephone] = useState(props.registration.telephone);
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");

    function validateEmail(email: string) {
        setEmail(email);

        if(email == null || email === "") { setEmailError("Du må legge inn en epost.") }
        else if(!email.includes("@")) { setEmailError("Ugyldig epost.") }
        else setEmailError("");
    }

    function validateTelephone(tele: string) {
        setTelephone(tele);
        const regex = new RegExp("^(\\+?)\\d{8,20}");
        if(tele == null || tele === "") { setTelephoneError("Du må legge inn et telefonnummer.") }
        else if(!regex.test(tele)) { setTelephoneError("Ugyldig telefonnummer.")}
        else setTelephoneError("");
    }

    function save() {
        let registration = {... props.registration};
        registration.telephone = telephone;
        registration.email = email;
        props.setRegistration(registration);
    }

    function goBack() {
        save();
        props.setCurrentStep(Steps.NameAge);
    }

    function nextStep() {
        save();
        props.setCurrentStep(Steps.ClubGrade);
    }

    return (
        <div className="slideLeft">
            <p className={styles.largeSpan}>For å kunne nå utøver/foreldre for informasjon eller ved en nødsituasjon må vi ha epost og telefonnummer til utøver/forelder.</p>
            <div className={styles.registrationForm}>
                
                <p>Epost:</p>
                <input value={email} onChange={x => validateEmail(x.currentTarget.value)} />
                <p>Telefon:</p>
                <input value={telephone} type="tel" onChange={x => validateTelephone(x.currentTarget.value)} />

            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} disabled={email === "" || telephone === "" || emailError !== "" || telephoneError !== ""} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default EmailTelephone;
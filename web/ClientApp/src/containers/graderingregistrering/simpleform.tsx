import { useState } from 'react';
import { SimpleStepProps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { GraderingType } from '../../models/registrationModels';
import { useLocation } from 'react-router-dom';

function SimpleForm(props: SimpleStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName)
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState(props.registration.email);
    const [telephone, setTelephone] = useState(props.registration.telephone);
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const location = useLocation();
    const registrationType = location.pathname.includes("gradering/barn") ? GraderingType.Children : GraderingType.Adults;

    function validateFirstName(name: string) {
        setFirstName(name);

        if(name == null || name === "") { setFirstNameError("Du må legge inn et fornavn") }
        else setFirstNameError("");
    }

    function validateLastName(name: string) {
        setLastName(name);
        if(name == null || name === "") { setLastNameError("Du må legge inn et etternavn") }
        else setLastNameError("");
    }

    function validateEmail(email: string) {
        setEmail(email);

        if(email == null || email === "") { setEmailError("Du må legge inn en epost") }
        else if(!email.includes("@") || email.includes(",")) { setEmailError("Ugyldig epost") }
        else setEmailError("");
    }

    function validateTelephone(tele: string) {
        setTelephone(tele);
        const regex = new RegExp("^(\\+?)\\d{8,20}");
        if(tele == null || tele === "") { setTelephoneError("Du må legge inn et telefonnummer") }
        else if(!regex.test(tele)) { setTelephoneError("Ugyldig telefonnummer")}
        else setTelephoneError("");
    }
    
    function save() {
        let registration = props.registration;
        registration.firstName = firstName;
        registration.lastName = lastName;
        registration.telephone = telephone;
        registration.email = email;
        registration.type = registrationType;

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
            <div className={styles.registrationForm}>
                <p>Fornavn:</p>
                <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                <p>Etternavn:</p>
                <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                <p>Epost:</p>
                <input value={email} type="email" onChange={x => validateEmail(x.currentTarget.value)} />
                <p>Telefon:</p>
                <input value={telephone} type="tel" onChange={x => validateTelephone(x.currentTarget.value)} />
                { registrationType === GraderingType.Adults && <p className={`${styles.largeSpan}`}>Husk at du må ha godkjennelse fra master Tom Lasse før du registrer deg</p>}
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    disabled={
                        firstName === "" 
                        || lastName === "" 
                        || firstNameError !== "" 
                        || lastNameError !== "" 
                        || email === "" 
                        || telephone === "" 
                        || emailError !== "" 
                        || telephoneError !== "" 
                    } 
                    onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default SimpleForm;
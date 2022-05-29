import { useState } from 'react';
import { SimpleStepProps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';

function SimpleForm(props: SimpleStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName)
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState(props.registration.email);
    const [telephone, setTelephone] = useState(props.registration.telephone);
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");

    function validateFirstName(name: string) {
        setFirstName(name);

        if(name == null || name === "") { setFirstNameError("Du må legge inn et fornavn.") }
        else setFirstNameError("");
    }

    function validateLastName(name: string) {
        setLastName(name);
        if(name == null || name === "") { setLastNameError("Du må legge inn et etternavn.") }
        else setLastNameError("");
    }

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
        let registration = props.registration;
        registration.firstName = firstName;
        registration.lastName = lastName;
        registration.telephone = telephone;
        registration.email = email;

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
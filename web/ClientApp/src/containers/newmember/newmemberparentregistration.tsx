import { useState } from 'react';
import { NewMemberStepProps, NewMemberSteps, SkoleStepProps, SkoleSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import React from 'react';

function NewMemberParentRegistration(props: NewMemberStepProps) {
    const isUnderage = props.registration.age < 18;

    const [firstName, setFirstName] = useState(isUnderage ? props.registration.parentFirstName : props.registration.firstName);
    const [lastName, setLastName] = useState(isUnderage ? props.registration.parentLastName : props.registration.lastName);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState(props.registration.email);
    const [telephone, setTelephone] = useState(props.registration.telephone);
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");


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
        registration.parentFirstName = firstName;
        registration.parentLastName = lastName;
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
        props.setCurrentStep(NewMemberSteps.Receipt);
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <div className={`${styles.centerize} ${styles.largeSpan}`}>
                    <h2>Registrer kontaktinformasjon{`${isUnderage ? " til foresatt" : ''}`}:</h2>
                </div>
                {isUnderage && <React.Fragment>
                    <p>Fornavn:</p>
                    <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                    <p>Etternavn:</p>
                    <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                </React.Fragment>}
                <p>E-post:</p>
                <input value={email} onChange={x => validateEmail(x.currentTarget.value)} />
                <p>Telefon:</p>
                <input value={telephone} onChange={x => validateTelephone(x.currentTarget.value)} />
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

export default NewMemberParentRegistration;
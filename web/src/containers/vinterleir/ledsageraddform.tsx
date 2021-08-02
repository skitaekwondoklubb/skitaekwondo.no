import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "./vinterleirRegistrationRoute";

function AddLedsager(props: StepProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(18);
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [sleepover, setSleepover] = useState(false);
    const [registeredPreviously, setRegistreredPreviously] = useState(false);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    function validateFirstName(name: string) {
        setFirstName(name);
        if(name == null || name === "") {
            setFirstNameError("Du må legge inn et fornavn.");
        }
        else {
            setFirstNameError("");
        }
    }

    function validateLastName(name: string) {
        setLastName(name);
        if(name == null || name === "") {
            setLastNameError("Du må legge inn et etternavn.");
        }
        else {
            setLastNameError("");
        }
    }

    function validateAge(newAge: number) {
        setAge(newAge);
        if(newAge == null || newAge === 0) {
            setAgeError("Du må legge inn en alder.");
        }
        else if(newAge < 18) {
            setAgeError("Ledsager må være myndig.");
        }
        else {
            setAgeError("");
        }
    }

    function validateTelephone(tele: string) {
        setTelephone(tele)
        if(tele.length < 8) {
            setTelephoneError("Du må legge inn et gyldig telefonnummer.");
        }
        else {
            setTelephoneError("");
        }
    }

    function validateEmail(email: string) {
        setEmail(email);
        if(!email.includes("@")) {
            setEmailError("Eposten er ikke gyldig.");
        }
        else {
            setEmailError("");
        }
    }

    function nextStep() {
        let registration = {... props.registration};
        registration.ledsagere.push({
            id: 0,
            firstName: firstName,
            lastName: lastName,
            age: age,
            telephone: telephone,
            email: email,
            sleepover: sleepover,
            alreadyRegistred: registeredPreviously,
        })

        props.setRegistration(registration);
        props.setCurrentStep(Steps.LedsagerManagement);
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <p>Fornavn:</p>
                <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                <p>Etternavn:</p>
                <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                <p>Alder:</p>
                <input value={age} type="number" onChange={x => validateAge(x.currentTarget.valueAsNumber)} />
                <p>Telefonnummer:</p>
                <input value={telephone} onChange={x => validateTelephone(x.currentTarget.value)} />
                <p>Epost:</p>
                <input value={email} onChange={x => validateEmail(x.currentTarget.value)} />
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setSleepover(!sleepover)}>
                    <input type="checkbox" checked={sleepover} onChange={x => setSleepover(x.currentTarget.checked)} />
                    <p>Overnatter</p>
                </div>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setRegistreredPreviously(!registeredPreviously)}>
                    <input type="checkbox" checked={registeredPreviously} onChange={x => setRegistreredPreviously(x.currentTarget.checked)} />
                    <p>Har allerede registrert seg tidligere for andre utøvere</p>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={() => props.setCurrentStep(Steps.LedsagerManagement)}>Tilbake</button>
                <button className={styles.nextButton} 
                    disabled={firstName == "" || firstNameError !== "" 
                    || lastName == "" || lastNameError !== "" 
                    || ageError !== "" 
                    || telephone == "" || telephoneError !== "" 
                    || email == "" || emailError !== ""} 
                    onClick={nextStep}
                >Legg til</button>
            </div>
        </div>
    )
}

export default AddLedsager;
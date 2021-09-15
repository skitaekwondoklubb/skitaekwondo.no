import { useState } from "react";
import styles from './registration.module.css';
import { StepProps, Steps } from "../../models/steps";

function NameAgeForm(props: StepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName)
    const [age, setAge]=  useState(props.registration.age);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ageError, setAgeError] = useState("");

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

    function validateAge(age: string) {
        const ageInt = Number.parseInt(age);
        setAge(ageInt);

        if(ageInt < 7) setAgeError("Du må fylle 8 år i år for å kunne delta på vinterleir.");
        else setAgeError("");
    }

    function save() {
        let registration = props.registration;
        registration.firstName = firstName;
        registration.lastName = lastName;
        registration.age = age;

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
                <p>Alder:</p>
                <input className={styles.ageInput} value={age} onChange={x => validateAge(x.currentTarget.value)} type="number" />
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    disabled={firstName === "" || lastName === "" || firstNameError !== "" || lastNameError !== "" || ageError !== ""} 
                    onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default NameAgeForm;
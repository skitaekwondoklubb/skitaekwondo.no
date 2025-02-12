import { useState } from 'react';
import { NewMemberStepProps, NewMemberSteps, SkoleStepProps, SkoleSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { useSearchParams } from 'react-router-dom';

function NewMemberRegister(props: NewMemberStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [age, setAge] = useState(props.registration.age);
    const [ageError, setAgeError] = useState("");

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

    function validateAge(age: number) {
        console.log(age);
        if(age == null || isNaN(age) || age < 7) { setAge(age); setAgeError("Må være 7 år eller eldre") }
        else { setAge(age); setAgeError(""); }
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
        props.setCurrentStep(NewMemberSteps.Parent);
    }



    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <div className={`${styles.centerize} ${styles.largeSpan}`}>
                    <h2>Registrer informasjon om utøver:</h2>
                </div>
                <p>Fornavn:</p>
                <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                <p>Etternavn:</p>
                <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                <p>Alder:</p>
                <input type="number" min={7} max={125} value={age} onChange={x => validateAge(x.currentTarget.valueAsNumber)} />
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton}
                    disabled={
                        firstName === "" 
                        || lastName === "" 
                        || firstNameError !== "" 
                        || lastNameError !== "" 
                        || ageError !== ""
                    } 
                    onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default NewMemberRegister;
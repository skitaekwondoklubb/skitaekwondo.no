import { useState } from 'react';
import { SkoleStepProps, SkoleSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';

function SkoleRegister(props: SkoleStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName);
    const [isMember, setIsMember] = useState(props.registration.isMember)
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
        if(age == null || age < 8 || age > 13) { setAge(age); setAgeError("Aldersgrense er 8-13 år") }
        else { setAge(age); setAgeError(""); }
    }

    
    function save() {
        let registration = props.registration;
        registration.firstName = firstName;
        registration.lastName = lastName;
        registration.age = age;
        registration.isMember = isMember;

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
        props.setCurrentStep(SkoleSteps.Parent);
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <div className={`${styles.centerize} ${styles.largeSpan}`}>
                    <h2>Registrer informasjon om deltaker:</h2>
                </div>
                <p>Fornavn:</p>
                <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                <p>Etternavn:</p>
                <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                <p>Alder:</p>
                <input type="number" value={age} onChange={x => validateAge(x.currentTarget.valueAsNumber)} />

                <div className={`${styles.largeSpan} ${styles.centerize} ${styles.regTopMargin}`}>
                    <div className={`${styles.regCheckbox} ${styles.checkboxCenter}`} onClick={() => setIsMember(!isMember)}>
                        <span>Er medlem av klubben</span>
                        <input id="thirdDay" checked={isMember} type='checkbox' onChange={e => {e.stopPropagation(); setIsMember(e.currentTarget.checked)}} />
                    </div>
                </div>
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

export default SkoleRegister;
import { useEffect, useState } from 'react';
import { JubileumStepProps, JubileumSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { sendJubileumRegistration } from '../../services/jubileumService';

function JubileumForm(props: JubileumStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName)
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [amountAdult, setAmountAdult] = useState(props.registration.adult);
    const [amountChild, setAmountChild] = useState(props.registration.child);
    const [amountError, setAmountError] = useState("");

    useEffect(() => {
        validateAmount();
    }, [amountAdult, amountChild])

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

    function validateAmount() {
        if(amountAdult == null || ((amountAdult + amountChild) <= 0)) { setAmountError("Det må bli med noen.") }
        else setAmountError("");
    }

    function save() {
        let registration = props.registration;
        registration.firstName = firstName;
        registration.lastName = lastName;
        

        props.setRegistration(registration);
    }
    
    function goBack() {
        save();
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {        

        sendJubileumRegistration({
            firstName: firstName,
            lastName: lastName,
            adult: amountAdult,
            child: amountChild
        })
        .then((x) => {
            if(x === "Done") {
                props.setCurrentStep(JubileumSteps.Done);
            }
        })
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <div className={styles.largeSpan}>
                    <p>Fornavn:</p>
                    <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                </div>
                <div className={styles.largeSpan}>
                    <p>Etternavn:</p>
                    <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                </div>
                <div className={styles.largeSpan}>
                    <p >Antall deltakere under 12 år:</p>
                    <input type={'number'} value={amountChild} onChange={x => setAmountChild(x.currentTarget.valueAsNumber)} />
                </div>
                <div className={styles.largeSpan}>
                    <p >Antall deltakere 12 år og eldre:</p>
                    <input type={'number'} value={amountAdult} onChange={x => setAmountAdult(x.currentTarget.valueAsNumber)} />
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
                        || amountError !== "" 
                    } 
                    onClick={nextStep}>Ferdig</button>
            </div>
        </div>
    )
}

export default JubileumForm;
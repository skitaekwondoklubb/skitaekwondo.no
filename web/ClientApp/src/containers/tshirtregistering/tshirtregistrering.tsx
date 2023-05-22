import { useEffect, useState } from 'react';
import { TShirtStepProps, TShirtSteps } from '../../models/simplesteps';
import styles from '../registrering/registration.module.css';
import { TShirt } from '../../models/tshirtsizes';

function TshirtForm(props: TShirtStepProps) {
    const [firstName, setFirstName] = useState(props.registration.firstName);
    const [lastName, setLastName] = useState(props.registration.lastName)
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState(props.registration.email);
    const [telephone, setTelephone] = useState(props.registration.telephone);
    const [emailError, setEmailError] = useState("");
    const [telephoneError, setTelephoneError] = useState("");
    const [allTshirts, setTshirts] = useState(props.registration.tshirts);

    useEffect(() => {
        setTshirts(props.registration.tshirts);
    }, [props.registration])

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
        else if(!email.includes("@") || email.includes(",") || email.includes(" ")) { setEmailError("Ugyldig epost.") }
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

    function addTshirt() {
        save();
        props.setCurrentStep(TShirtSteps.AddTshirt);
    }

    function removeTshirt(tshirt: TShirt) {
        const tshirts = props.registration.tshirts;
        let newTshirts = tshirts.filter(x => x.model !== tshirt.model && x.size !== tshirt.size);

        // Hack if more than one got filtered out.
        if(newTshirts.length !== tshirts.length -1) {
            for (let index = 0; index < (tshirts.length - newTshirts.length); index++) {
                newTshirts.push(tshirt);
            }
        }

        let registration = props.registration;
        registration.tshirts = newTshirts;
        setTshirts(newTshirts);
        props.setRegistration(registration);
        save();
    }

    return (
        <div className="slideLeft">
            <div className={styles.registrationForm}>
                <p>Fornavn (medlem):</p>
                <input value={firstName} onChange={x => validateFirstName(x.currentTarget.value)} />
                <p>Etternavn (medlem):</p>
                <input value={lastName} onChange={x => validateLastName(x.currentTarget.value)} />
                <p>Epost:</p>
                <input value={email} type="email" onChange={x => validateEmail(x.currentTarget.value)} />
                <p>Telefon:</p>
                <input value={telephone} type="tel" onChange={x => validateTelephone(x.currentTarget.value)} />
                <p className={`${styles.largeSpan} ${styles.lessMarginBottom}`}>T-Skjorter:</p>
                { allTshirts && allTshirts.map((x, index) => {
                    return (
                        <RenderTShirt tshirt={x} remove={() => removeTshirt(x) } isFirst={index === 0} />
                    )
                })}

                <div className={`${styles.largeSpan} ${styles.addTshirtButton}`}>
                    <button onClick={() => addTshirt()}>Legg til t-skjorte {props.registration.tshirts.length > 0 ? "(+160kr)" : ""}</button>
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
                        || email === "" 
                        || telephone === "" 
                        || emailError !== "" 
                        || telephoneError !== "" 
                        || props.registration.tshirts.length < 1
                    } 
                    onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

function RenderTShirt(props: { tshirt: TShirt, remove: () => void, isFirst: boolean}) {
    return (
        <div className={`${styles.largeSpan} ${styles.tshirtShowcase}`}>
            <span>Modell: {props?.tshirt?.model ?? "Ukjent"}, { props?.tshirt?.size ?? "Ukjent"} { !props.isFirst ? "(+160,-)" : "(Gratis)" }</span>
            <button onClick={props.remove}>Fjern</button> 
        </div>
    )
}

export default TshirtForm;
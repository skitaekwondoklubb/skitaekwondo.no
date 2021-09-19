import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StepProps } from '../../models/steps';
import { deleteAllCookies } from '../../services/cookieService';
import { sendRegistration } from '../../services/registrationService';
import styles from './registration.module.css';
import RegistrationRouting from './registreringRouting';

export function RegistrationStep(props: StepProps)  {

    function goBack() {
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        sendRegistration(props.registration).then((success: boolean) => {
            if(success && typeof(props.nextStep) === "number") {
                props.setCurrentStep(props.nextStep);
            }
        })
    }

    return (
        <div>
            <h2>Din registrering:</h2>
            <p>Navn: {props.registration.firstName} {props.registration.lastName}</p>
            <p>Telefon: {props.registration.telephone}</p>
            <p>Epost: {props.registration.email}</p>
            <p>Pizza: {props.registration.pizza === true ? "Ja" : "Nei"}</p>
            <p>Veganer: {props.registration.vegan}</p>
            <p>Allergier: {props.registration.allergies}</p>
            <p>Annet: {props.registration.otherInfo}</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
        </div>
    )
}

export function Done() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Du er herved registrert til kamphelg!</h2>
            <p>Vi gleder oss til å se deg der!</p>
            <p>For endringer eller avbestilling ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a>
            </p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export function Welcome(props: StepProps) {
    const [accept, setAccept] = useState(false);

    return (
        <div>
            <p>Velkommen til registrering for Ski Taekwondo Klubbs kamphelg 25. til 26. september!</p>
            <p>Vi vil trenge informasjon som en del av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Denne informasjonen vil <b>kun</b> brukes av Ski Taekwondo Klubb for å arrangere kamphelgen. Ski Taekwondo Klubb deler ingen
                informasjon med tredjeparter.</p>
            <p>Etter helgen er gjennomført vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <div className={styles.disclaimer} onClick={() => setAccept(!accept)}>
                <input type={"checkbox"} checked={accept} onClick={() => setAccept(!accept)} />
                <p>Jeg godkjenner at Ski Taekwondo Klubb bruker denne informasjonen for å arrangere kamphelg.</p>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} disabled={!accept} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


function Registrering() {
    return (
        <div className={`${styles.registration} slideLeft`}>
            <div className={styles.textSide}>
                <h1>Registrering til kamphelg</h1>
                <RegistrationRouting />
            </div>

        </div>
    )
}


export default Registrering;
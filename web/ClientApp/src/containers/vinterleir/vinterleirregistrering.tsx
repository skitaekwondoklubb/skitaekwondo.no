import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StepProps } from '../../models/steps';
import { deleteAllCookies } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';
import RegistrationRouting from './vinterleirRegistrationRoute';

export function Done() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Du er herved registrert til vinterleir 2021! :)</h2>
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
            <p>Velkommen til registrering for Ski Taekwondo Klubbs vinterleir 2021!</p>
            <p>Vi vil trenge en del informasjon iløpet av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Denne informasjonen vil <b>kun</b> brukes av Ski Taekwondo Klubb for å arrangere vinterleir. Ski Taekwondo Klubb deler ingen
                informasjon med tredjeparter.</p>
            <p>Etter vinterleieren er gjennomført vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <div className={styles.disclaimer} onClick={() => setAccept(!accept)}>
                <input type={"checkbox"} checked={accept} onClick={() => setAccept(!accept)} />
                <p>Jeg godkjenner at Ski Taekwondo Klubb bruker denne informasjonen for å arrangere vinterleir.</p>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} disabled={!accept} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


function VinterleirRegistrering() {
    return (
        <div className={`${styles.registration} slideLeft`}>
            <div className={styles.textSide}>
                <h1>Registrering til vinterleir</h1>
                <RegistrationRouting />
            </div>

        </div>
    )
}


export default VinterleirRegistrering;
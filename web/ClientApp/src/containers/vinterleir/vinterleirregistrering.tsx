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
            <h2>Du er herved registrert til vinterleir 2023!</h2>
            <p>Vi gleder oss til å se deg der!</p>
            <p className={styles.lessMarginBottom}>For endringer eller avbestilling ta kontakt med oss på</p>
            <p className={styles.lessMarginTop}><a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export function Welcome(props: StepProps) {
    const [accept, setAccept] = useState(false);
    const [acceptBetingelser, setAcceptBetingelser] = useState(false);

    return (
        <div>
            <p>Velkommen til etterregistrering for Ski Taekwondo Klubbs vinterleir 2023!</p>
            <p>Vi vil trenge en del informasjon iløpet av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Ski Taekwondo Klubb viser at du deltar for andre med kun klubb og anonymt blir med i beltegradstatistikken. Ingen annen informasjon deles uten samtykke.</p>
            <p>Etter vinterleieren er gjennomført vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <p>Vi tar bilder under arrangementet for bruk på nettsiden, Facebook o.l. Dersom du/ditt barn ikke ønsker å bli tatt bilde av må dette meddeles mot slutten av registreringen.</p>
            <p>Avmelding kan gjøres til oss via e-post: <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a>.</p>
            <p>Etterregistrering har et tillegsgebyr på 100,-</p>
            {/* <p>Ved avmelding før midnatt 18. november vil hele summen refunderes. Alle avmeldinger etter 18. november vil kun halve beløpet refunderes.</p> */}
            
            <div className={styles.disclaimer} onClick={() => setAccept(!accept)}>
                <input type={"checkbox"} checked={accept} onClick={() => setAccept(!accept)} />
                <p>Jeg godkjenner at Ski Taekwondo Klubb bruker denne informasjonen for å arrangere vinterleir.</p>
            </div>
            <div className={styles.disclaimer} onClick={() => setAcceptBetingelser(!acceptBetingelser)}>
                <input type={"checkbox"} checked={acceptBetingelser} onClick={() => setAccept(!acceptBetingelser)} />
                <p>Jeg godkjenner <a href={`/Salgsbetingelser.pdf`} target="_blank" rel="noreferrer">Ski Taekwondo Klubbs salgsbetingelser.</a></p>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} disabled={!accept || !acceptBetingelser} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


function VinterleirRegistrering() {
    return (
        <div className={styles.registrationCenter}>
            <div className={`${styles.registration} slideLeft`}>
                <div className={styles.textSide}>
                    <h1>Etterregistrering til vinterleir</h1>
                    <RegistrationRouting />
                </div>

            </div>
        </div>

    )
}


export default VinterleirRegistrering;
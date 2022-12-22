import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleStepProps } from '../../models/simplesteps';
import { deleteAllCookies } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';

function SimpleGradering(props: SimpleStepProps) {
    const [accept, setAccept] = useState(false);
    
    return (
        <div className={`${styles.registrationTop} slideLeft`}>
            <p>Velkommen til registrering til gradering i Ski Taekwondo Klubb.</p>
            <p>Vi vil trenge informasjon som en del av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Denne informasjonen vil <b>kun</b> brukes av Ski Taekwondo Klubb for å arrangere gradering. Ski Taekwondo Klubb deler ingen
                informasjon med tredjeparter.</p>
            <p>Etter gradering er gjennomført vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <div className={styles.disclaimer} onClick={() => setAccept(!accept)}>
                <input type={"checkbox"} checked={accept} onClick={() => setAccept(!accept)} />
                <p>Jeg godkjenner at Ski Taekwondo Klubb bruker denne informasjonen for å arrangere gradering.</p>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} disabled={!accept} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


export function SimpleGraderingDone() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Du er herved registrert til gradering, lykke til!</h2>
            <p>Du skal nå ha fått en epost som bekreftelse.</p>
            <p>For endringer eller avbestilling ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export default SimpleGradering;
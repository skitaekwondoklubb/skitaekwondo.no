import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JubileumStepProps } from '../../models/simplesteps';
import { deleteAllCookies } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';

function Tshirt(props: JubileumStepProps) {
    
    return (
        <div className={`${styles.registrationTop} slideLeft`}>
            <p>Velkommen til registrering til Ski Taekwondo Klubbs sommeravslutning 2024!</p>
            <p>Vi vil trenge informasjon som en del av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Denne informasjonen vil kun brukes av Ski Taekwondo Klubb for å kunne registrere påmelding til sommeravslutning. Ski Taekwondo Klubb deler ingen
                informasjon med tredjeparter.</p>
            <p>Etter sommeravslutningen vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


export function JubileumDone() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Tusen takk for at du deltar!</h2>
            <p>For endringer ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export default Tshirt;
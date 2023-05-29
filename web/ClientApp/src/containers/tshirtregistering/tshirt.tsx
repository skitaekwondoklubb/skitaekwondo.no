import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TShirtStepProps } from '../../models/simplesteps';
import { deleteAllCookies } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';

function Tshirt(props: TShirtStepProps) {
    
    return (
        <div className={`${styles.registrationTop} slideLeft`}>
            <p>Velkommen til kjøp av t-skjorte til Ski Taekwondo Klubb 45-års jubileum!</p>
            <p><b>På grunn av god innsats under dugnaden på Spond vil alle medlemmer få én (1) t-skjorte gratis!</b></p>
            <p><b>Dersom dere er flere medlemmer i familien, lag en registrering per utøver.</b></p>
            <p><u>Hvis man ønsker flere t-skjorter koster det 160kr per stk.</u></p>
            <p>Vi vil trenge informasjon som en del av registreringsprosessen og vil lagre dette digitalt.</p>
            <p>Denne informasjonen vil <b>kun</b> brukes av Ski Taekwondo Klubb for å kunne registrere og motta betaling for t-skjortene. Ski Taekwondo Klubb deler ingen
                informasjon med tredjeparter.</p>
            <p>Etter jubileumet er ferdig vil digital personlig identifiserbar informasjon anonymiseres eller slettes.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}


export function TshirtSaleDone() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Tusen takk for din ordre!</h2>
            <p>Du skal nå ha fått en epost med kvittering.</p>
            <p>For endringer eller avbestilling ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export default Tshirt;
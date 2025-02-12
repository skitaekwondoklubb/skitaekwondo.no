import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewMemberStepProps } from '../../models/simplesteps';
import { deleteAllCookies } from '../../services/cookieService';
import styles from '../registrering/registration.module.css';
import spond from './spond.png';

function NewMember(props: NewMemberStepProps) {
    
    return (
        <div className={`${styles.registrationTop} slideLeft`}>
            <p>Velkommen til registrering i Ski Taekwondo Klubb!</p>
            <p>Vi vil trenge informasjon som en del av registreringsprosessen og vil midlertidig lagre dette digitalt.</p>
            <p>Denne informasjonen vil kun brukes av Ski Taekwondo Klubb for å kunne gi deg god informasjon og følge opp registrering mot medlemssystemet.</p>
            <p><b>Du vil ikke trenge å betale noe under registreringen.</b></p>
            <p><b>Du blir ikke automatisk registrert inn i medlemsysstemet.</b></p>
            <p>Disse dataene slettes etter at man har registrert seg i medlemssystemet eller ikke ønsker å bli medlem av klubben.</p>
            <p>Hvis du ønsker at vi sletter informasjonen før dette, ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a>.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.nextButton} onClick={() => props.setCurrentStep(props.step+1)}>Neste</button>
            </div>
        </div>
    )
}

export function NewMemberDone() {
    useEffect(() => {
        deleteAllCookies();
    }, [])

    return (
        <div className={styles.done}>
            <h2>Tusen takk for din interesse i Ski Taekwondo Klubb!</h2>
            <p>Vi ønsker også at alle medlemmer også melder seg inn i Spond. Scan gjerne QR koden under med mobilen for å melde deg inn i vår Spond gruppe så vi kan lett gi deg informasjon om treninger.</p>
            <img src={spond} />
            <a target='_blank' href="https://spond.com/landing/group/APZXO">Spond - Ski Taekwondo Klubb</a>
            <p>For spørsmål eller endringer ta kontakt med oss på <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            <Link to={"/"}><button>Tilbake til forsiden</button></Link>
        </div>
    )
}

export default NewMember;
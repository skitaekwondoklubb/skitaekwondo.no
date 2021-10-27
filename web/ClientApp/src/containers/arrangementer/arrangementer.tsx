import React from 'react';
import { Link } from 'react-router-dom';
import styles from './arrangementer.module.css';
import vinterleirPicture from '../vinterleir/Vinterleir.webp';

function Arrangementer() {
    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.textSide}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>
                <p>Vi holder flere arrangementer i Ski Taekwondo Klubb hvert år, en av gjengangerne er Ski Taekwondo Klubbs vinterleir i desember.</p>
                <p>Følgende arrangementer er på agendaen høsten 2021:</p>
                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
                <h3>Dato: 3-5. desember 2021.</h3>
                <h3>Pris: 975,- for voksen, 825,- for barn.</h3>
                <p>Vårt årlige vinterleir skal holdes i år etter et opphold i 2020!</p>
                <p>Her blir det mye fart og moro i Stil Arena på Langhus! Utøvere fra TTU klubber over hele landet kommer for å delta på vinterleir med oss.</p>
                <p>Ypperlig sted for å møte flere som elsker taekwondo og for å få helt unike treninger med mastere fra hele Norge!</p>
                <p>Dangradering er fredag 3. desember. Det vil også være cupgradering på søndagen den 5. desember i Stil Arena.</p>
                <Link to="/vinterleirregistrering"><button className={`${styles.registrationButton} ${styles.spaceButtons}`}>Registrering til vinterleir</button></Link>
                <Link to="/vinterleir"><button className={`${styles.registrationButton} ${styles.spaceButtons}`}>Mer informasjon om vinterleir</button></Link>
            </div>
        </div>
    )
}

export default Arrangementer;
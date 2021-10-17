import React from 'react';
import { Link } from 'react-router-dom';
import styles from './arrangementer.module.css';
import arrangementPic1 from '../ungdomvoksen/ungvoksaction.webp';

function Arrangementer() {
    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.textSide}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>
                <p>Vi holder flere arrangementer i Ski Taekwondo Klubb hvert år, en av gjengangerne er Ski Taekwondo Klubbs vinterleir i desember.</p>
                <p>Følgende arrangementer er på agendaen høsten 2021:</p>
                <h2>Danseminar i Ski Taekwondo Klubb</h2>
                <img src={arrangementPic1} alt="Danseminar!"/>
                <h3>Dato: 22-24. oktober 2021.</h3>
                <h3>Pris: 800 (+80kr for pizza på fredagen)</h3>
                <h3>Dette arrangementet er kun for de med 1 eller 2. cup og dan.</h3>
                <p>Ski Taekwondo Klubb kommer til å holde danseminar fra 22. oktober til 24. oktober i lokalene våre i Ski!</p>
                <p>Det er muligheter å ta fysisk test og teori til dangradering på dette arrangementet.</p>
                <p><a href="/InvitasjonDanSeminarSki2021.pdf" target="_blank" rel="noreferrer">Se vår flyer for mer informasjon.</a></p>
                <hr/>
                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <h3>Dato: 3-5. desember 2021.</h3>
                <h3>Pris: 950,- for voksen, 825,- for barn.</h3>
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
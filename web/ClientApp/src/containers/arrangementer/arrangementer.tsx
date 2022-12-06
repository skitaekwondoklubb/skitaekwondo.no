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
                <p>Følgende arrangementer er på agendaen i 2023:</p>

                <h2>Gradering i Ski Taekwondo Klubb</h2>
                <h3>Dato: Tirsdag 10. januar.</h3>
                {/* <h3>Pris: 975,- for voksen, 825,- for barn.</h3> */}
                <p>Vanligvis har det vært cupgradering på vinterleir, men denne gangen bestemte vi oss for å ha gradering i januar for ungdommer og voksne.</p>
                <p>Ikke glem å ta med medlemspass!</p>

                <hr/>


                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
  
                <h3>Dato: Forhåpentligvis tidlig desember 2023.</h3>
                {/* <h3>Pris: 975,- for voksen, 825,- for barn.</h3> */}
                {/* <div className={styles.invitations}>
                    <a href="/vinterleir2022_barn.pdf" target={"_blank"}>Invitasjon - Barn.</a>
                    <a href="/vinterleir2022_ungvoks.pdf" target={"_blank"}>Invitasjon - Ungdom/Voksen.</a>
                </div>

                <Link to={"/program"}>
                    <button className={styles.registrationButton}>Program - Vinterleir 2022</button>
                </Link> */}
{/* 
                <Link to={"/vinterleirregistrering"}>
                    <button className={styles.registrationButton}>Registrering til vinterleir</button>
                </Link> */}
{/* 
                <div className={styles.spaceLinks}>
                    <Link to="/vinterleirdeltakere">Du kan se en liste over påmeldte her.</Link>
                </div> */}

                <p>Tusen takk for et kjempebra comeback i 2022!</p>
                {/* <p>Vinterleieren er en sosial sammenkomst mellom medlemmer i mange forskjellige TTU klubber. Denne gangen er det fra 2. desember til 4. desember.</p> 
                <p>Her trener vi, er sosiale med hverandre og har det kjempegøy. Igjen kommer mange flinke mastere fra hele landet til å instruere.</p>
                <p>Vi gleder oss masse og håper mange deltar på Ski Taekwondo Klubbs vinterleir 2022!</p> */}
            </div>
        </div>
    )
}

export default Arrangementer;
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
                <p>Følgende arrangementer er på agendaen i 2022:</p>

                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
                <h3>Dato: Første uken av desember 2022.</h3>
                <h3>Pris: 975,- for voksen, 825,- for barn.</h3>
                <p>Dessverre ble vinterleiren i fjor avlyst</p>
                <p>Vi håper alle gode ting er tre og at vi kan gjennomføre vinterleir i 2022.</p>
                <p>Mer informasjon kommer i løpet av høsten</p>
            </div>
        </div>
    )
}

export default Arrangementer;
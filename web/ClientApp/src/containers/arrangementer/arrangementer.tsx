import React from 'react';
import { Link } from 'react-router-dom';
import styles from './arrangementer.module.css';
import vinterleirPicture from '../vinterleir/Vinterleir.webp';

function Arrangementer() {
    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.textSide}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>
                {/* <p>Vi holder flere arrangementer i Ski Taekwondo Klubb hvert år, en av gjengangerne er Ski Taekwondo Klubbs vinterleir i desember.</p>
                <p>Følgende arrangementer er på agendaen i 2021:</p> */}
                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
                <h3>Dato: Avlyst.</h3>
                <h3>Pris: 975,- for voksen, 825,- for barn.</h3>
                <b>
                    <p>Dessverre ble vinterleiren avlyst i år også grunnet stor smittespredning og anbefalinger fra myndigheter.</p>
                    <p>Vi håper alle gode ting er tre og at vi kan gjennomføre vinterleir neste år.</p>
                    <p>I mellomtiden får alle passe på hverandre, ha en fin jul 🎅🏻 og godt nyttår. 🎆</p>
                    <p>Så sees vi til vinterleir i 2022! 🙂</p>
                </b>
            </div>
        </div>
    )
}

export default Arrangementer;
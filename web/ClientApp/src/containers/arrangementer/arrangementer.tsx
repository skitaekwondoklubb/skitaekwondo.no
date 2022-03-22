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

                <h2>Årsmøte i Ski Taekwondo Klubb</h2>
                <h3>Dato: Fredag 25. mars klokken 18:00</h3>
                <h3>Alle medlemmer i Ski Taekwondo Klubb har møterett. Foreldre som ikke er medlemmer har ikke møterett på vegne av eget barn.</h3>
                <h3>Ingen kan møte med fullmakt fra et annet medlem på årsmøtet.</h3>
                <p>
                    Vi avholder årsmøte i Ski Taekwondo Klubb den 25. mars i dojangen. På dette møtet vil ting som årsberetning og regnskap for 2021, budsjetter,
                    årsplaner for 2022, forslag og valg av styret skje.
                </p>
                <p>Dokumenter til årsmøtet:</p>
                <div className={styles.documents}>
                    <a href="/aarsmote/Innkalling2022.pdf" target={`_blank`}>Innkalling</a>
                    <a href="/aarsmote/Saksliste2022.pdf" target={`_blank`}>Saksliste</a>
                    <a href="/aarsmote/Budsjett2021.pdf" target={`_blank`}>Budsjett</a>
                    <a href="/aarsmote/Aarsberretning2022.pdf" target={`_blank`}>Årsberetning</a>
                    <a href="/aarsmote/Aarsplan2022.pdf" target={`_blank`}>Årsplan</a>
                    <a href="/aarsmote/InnkomneForslag2022.pdf" target={`_blank`}>Innkomne forslag</a>
                    <a href="/aarsmote/Innstilling2022.pdf" target={`_blank`}>Valg av styre</a>
                </div>

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
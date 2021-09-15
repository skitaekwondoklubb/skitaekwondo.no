import React from 'react';
import { HashRouter, Route, NavLink, Link } from 'react-router-dom';
import styles from './arrangementer.module.css';

function Arrangementer() {
    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.mainText}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>
                <p>Vi holder flere arrangementer i Ski Taekwondo Klubb hvert år, en av gjengangerne er Ski Taekwondo Klubb sin vinterleir i desember.</p>
                <p>Følgende arrangementer er på agendaen:</p>
                <h2>Ski Taekwondo Klubbs kamphelg</h2>
                <h3>Dato: 25. - 26. september 2021.</h3>
                <h3>Pris: Gratis</h3>
                <p>Team Ski - Ski Taekwondo klubb sin konkurransegruppe starter opp et utviklings parti i kamp denne høsten, med kick off lørdag 24. og søndag 25.september
                    Her vil utøverne få en innføring og opplæring i hva som kreves av innsats og ferdigheter for å konkurrere på lokalt, nasjonalt og internasjonalt nivå.
                </p>
                <p>Alle som starter på Team Ski starter i konkurranser på det nivået som man er på, for de aller fleste vil det si lokalt nivå - eksempelvis Østlandscup.</p>
                <p>Det stilles krav til oppmøte og god innsats - Team Ski er et tilbud i tillegg til vanlig trening.</p>
                <p>OBS! Man forplikter seg ikke til å bli med Team Ski dersom man blir med denne helgen. </p>
                <Link to="/registrering">
                    <button className={styles.registrationButton}>Registrering til kamphelg</button>
                </Link>
                <hr/>
                <h2>Danseminar i Ski Taekwondo Klubb</h2>
                <h3>Dato: 22. oktober 2021.</h3>
                <h3>Pris: Under utvikling</h3>
                <p>Ski Taekwondo Klubb kommer til å holde danseminar den 22. oktober i lokalene våre i Ski.</p>
                <p>Dette arrangementet er kun for de med 2. cup og dan (sort belte). Det er muligheter å ta fysiske tester til dangradering på dette arrangementet.</p>
                <p>Mer informasjon om danseminar kommer om kort tid.</p>
                <hr/>
                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <h3>Dato: 3-5. desember 2021.</h3>
                <h3>Pris: Under utvikling</h3>
                <p>Vårt årlige vinterleir skal holdes i år etter et opphold i 2020!</p>
                <p>Her blir det mye fart og moro på Stil Arena på Langhus! Utøvere fra klubber over hele landet kommer for å delta på vinterleir med oss.</p>
                <p>Ypperlig sted for å møte flere som elsker taekwondo og for å få helt unike treninger med mastere fra hele landet!</p>
                <p>Det vil også være gradering på søndagen den 5. desember i Stil Arena.</p>
                <p>Registrering til vinterleir vil være oppe om ikke alt for lenge.</p>
            </div>
        </div>
    )
}

export default Arrangementer;
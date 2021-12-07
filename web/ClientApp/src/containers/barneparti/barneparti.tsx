import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import styles from './barneparti.module.css';
import sidePicture from './pictures/barneparti.webp'
import actionPicture from './pictures/barnepartiaction.webp'

function BpInformation() {
    return (
        <div className="fadeIn">
            <p>Barnepartiet er for barn fra 8 til 12 år. Her vil man lære selvforsvar og grunnleggende teknikker igjennom lek og moro. En fantastisk måte for barn å vokse både fysisk og psykisk sammensveiset med kroppsbeherskelse og disiplin.</p>
            <p>Taekwondo er ikke bare trening, men også en stor sosial faktor for mange barn som får trent med både gamle og nye venner på samme alder.</p>
            <img src={actionPicture} alt="Barnepartiet in action" />
            <p>Barnepartiet består av to partier, ett nybegynnerparti og ett videregåendeparti, dermed er det lett å passe inn med andre som er på samme nivå. </p>
        </div>

    )
}

function Treningstider() {
    return (
        <div className="fadeIn">
            <h2 className={styles.margin}>Nybegynner:</h2>
            <p>Mandag og onsdag: 18:10 - 19:20</p>
            <p>Lørdag: 12:00 - 13:00</p>
            <h2 className={styles.margin}>Videregående:</h2>
            <p>Mandag og onsdag: 18:00 - 19:15</p>
            <p>Lørdag: 12:00 - 13:00</p>
        </div>
    )
}

function Priser() {
    return (
        <div className="fadeIn">
            <h2 className={styles.price}>Per måned: 290,-</h2>
            <p>Vi tilbyr også familie rabatt! Fra andre betalende familiemedlem gjelder 10 % rabatt.*</p>
            <p>Bindingsperiode etter start er på 6 måneder.</p>

            <h2 className={styles.margin}>Om medlemskontigent:</h2>
            <p>Vi har avtalegiro basert på NIF og NKF sine retningslinjer for å sikre at alle er registrert og forsikret etter gjeldende regler.</p>
            <p>Medlemskapet er løpende frem til det er skriftlig sagt opp.</p>
            <p>I tillegg til månedsgebyr er det en kontigent til Norges Idrettsforbund (kr 350) som vil bli belastet i april hvert år.</p>
            <p>Denne kontingenten inkluderer årskontingent til Norges Kampsportforbund (NKF) som inkluderer forsikring og medlemspass.</p>
            <small>* Hvis flere enn 3 deltagere i en familie, vil egne regler gjelde.</small>

        </div>
    )
}

function Barneparti() {
    return (
        <div className={`${styles.barnepartiGrid} `}>
            <div className={`${styles.picture} fadeInHomeBG`}>
                <img src={sidePicture} alt="Barnepartiet"/>
            </div>
            <div className={`${styles.textSide} slideLeft`}>
                <HashRouter>
                    <h1>Barnepartiet</h1>
                    <div className={styles.subButtons}>
                        <NavLink exact to="/" activeClassName={styles.buttonActive}>
                            <button>
                                <span>Informasjon</span>
                            </button>
                        </NavLink>
                        <NavLink to="/treningstider" activeClassName={styles.buttonActive}>
                            <button>Treningstider</button>
                        </NavLink>
                        <NavLink to="/priser" activeClassName={styles.buttonActive}>
                            <button>Priser</button>
                        </NavLink>
                    </div>
                    <Route exact path='/'>
                        <BpInformation/>
                    </Route>
                    <Route path='/treningstider'>
                        <Treningstider/>
                    </Route>
                    <Route path='/priser'>
                        <Priser/>
                    </Route>
                </HashRouter>
                <b>
                    <p>Vi vil nå ta inn nye medlemmer fortløpende, så ta kontakt raskt for å unngå venteliste.</p>
                    <p>Send mail til <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a> for å høre om det er plass på vårsemesteret!</p>
                </b>
            </div>
        </div>
    )
}

export default Barneparti;
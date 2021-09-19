import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import styles from './ungdomvoksen.module.css';
import ungvoksPicSide from './ungvoks.webp'
import ungvoksMid from './ungvoksaction.webp'

function UvpInformation() {
    return (
        <div className="fadeIn">
            <p>For de som er tolv år og eldre er ungdom/voksenpartiet et ypperlig valg for å trene taekwondo.</p>
            <p>Her vil man få god trening og utfordringer både fysisk og mentalt i tillegg til et godt sosialt miljø.</p>
            <img src={ungvoksMid} alt="Ungdom/voksen in action" />
            <p>Både ungdom og voksne deltar på dette partiet så ikke vær redd for å melde deg på uansett alder eller tidligere erfaring med kampsport.</p>
            <p>Dette partiet vil lære deg grunnleggende teknikker, kroppsbeherskelse og prinsipper i taekwondo. Det er en fantastisk måte å vokse på både fysisk og psykisk uansett alder!</p>
        </div>

    )
}

function Treningstider() {
    return (
        <div className="fadeIn">
            <h2 className={styles.margin}>Treningtider:</h2>
            <p>Tirsdag og torsdag: 18:00 - 19.30</p>
            <h2>Rødt og svart belte:</h2>
            <p>Mandag og onsdag: 19:30 - 21:00.</p>
        </div>
    )
}

function Priser() {
    return (
        <div className="fadeIn">
            <h2 className={styles.price}>Ungdom: 330,- per måned.</h2>
            <h2 className={styles.price}>Voksen: 370,- per måned.</h2>
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

function UngdomVoksenpartiet() {
    return (
        <div className={`${styles.ungdomvoksenGrid}`}>
            <div className={`${styles.picture} fadeInHomeBG`}>
                <img src={ungvoksPicSide} alt="Utøver ungdom/voksenpartiet"/>
            </div>
            <div className={`${styles.textSide} slideLeft`}>
                <HashRouter>
                    <h1>Ungdom/voksenpartiet</h1>
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
                        <UvpInformation/>
                    </Route>
                    <Route path='/treningstider'>
                        <Treningstider/>
                    </Route>
                    <Route path='/priser'>
                        <Priser/>
                    </Route>
                </HashRouter>
            </div>
        </div>
    )
}

export default UngdomVoksenpartiet;
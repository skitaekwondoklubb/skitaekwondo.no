import React from 'react';
import { HashRouter, Route, NavLink, Link, useHistory } from 'react-router-dom';
import styles from './vinterleir.module.css';

function Information(props: { history: any }) {

    return (
        <div>
            <p>Ski Taekwondo Klubb holder vår 19 vinterleir i år for alle TTU klubber i Follo Stil Arena!</p>
            <p>Vinterleiren er en helg fra fredag til søndag med masse taekwondomoro for alle utøvere med gradering på søndag.</p> 
            <p>Det er en ypperlig måte å bli kjent med andre utøvere fra hele Norge og trene med helt andre flinke mastere fra andre klubber og utøvere!</p>
            <p>Man kan overnatte i salen dersom man ønsker det og vi har frokost, lunsj og middag for alle utøvere. Vi har også en kiosk for kaffe, mini pizza eller andre godsaker.</p>
            <p>Så kom bli med oss i Follo Stil Arena og bli med på en helg fylt med moro, spenning og god trening!</p>
            <button className={styles.registrationButton} onClick={() => props.history.push("/registrering")}>Registrering til vinterleir 2021</button>
        </div>

    )
}

function Schedule() {
    return (
        <div>
            <p>Se full timeplan her: <a href="www.vg.no">Timeplan for Vinterleir 2021</a></p>
            <div className={styles.scheduleGrid}>
                <div>
                    <h2 className={styles.margin}>Fredag 3. desember:</h2>
                    <p>Registrering:</p>
                    <p>17:00 - 19:00</p>
                    <p>Trening:</p>
                    <p>19:00-20:00</p>
                    <p>Dangradering</p>
                    <p>19:15 - Ukjent</p>
                </div>
                <div>
                    <h2 className={styles.margin}>Lørdag 4. desember:</h2>
                    <p>Frokost:</p>
                    <p>08:00 - 09:00</p>
                    <p>Trening:</p>
                    <p>..........</p>
                </div>
            </div>
        </div>
    )
}

function Priser() {
    return (
        <div>
            <p>Her er prisene for vinterleiren 2021:</p>
            <h2 className={styles.price}>1000,- for utøvere.</h2>
            <h2 className={styles.price}>800,- for følgere.</h2>
            <p>Betaling skjer igjennom Vipps på registreringssiden.</p>
        </div>
    )
}

function Vinterleir() {
    const history = useHistory();

    return (
        <div className={`${styles.vinterleirGrid} slideLeft`}>
            <div className={styles.picture}>
                <p>Bilde av vinterleir</p>
            </div>
            <div className={styles.textSide}>
                <HashRouter>
                    <h1>Vinterleir</h1>
                    <div className={styles.subButtons}>
                        <NavLink exact to="/" activeClassName={styles.buttonActive}>
                            <button>
                                <span>Informasjon</span>
                            </button>
                        </NavLink>
                        <NavLink to="/schedule" activeClassName={styles.buttonActive}>
                            <button>Timeplan</button>
                        </NavLink>
                        <NavLink to="/priser" activeClassName={styles.buttonActive}>
                            <button>Priser</button>
                        </NavLink>
                    </div>
                    <Route exact path='/'>
                        <Information history={history}/>
                    </Route>
                    <Route path='/schedule'>
                        <Schedule/>
                    </Route>
                    <Route path='/priser'>
                        <Priser/>
                    </Route>
                </HashRouter>
            </div>
        </div>
    )
}

export default Vinterleir;
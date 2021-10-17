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
            <button className={styles.registrationButton} onClick={() => props.history.push("/vinterleirregistrering")}>Registrering til vinterleir 2021</button>
        </div>

    )
}

function Schedule() {
    return (
        <div>
            <p>Timeplan er klart om ikke alt for lenge!</p>
            <p>Vi kommer tilbake med mer informasjon så snart dagsplanene er satt i stein.</p>
            <p>Se vår flyer for mer informasjon.</p>
        </div>
    )
}

function Priser() {
    return (
        <div>
            <p>Her er prisene for vinterleiren 2021:</p>
            <h2>825,- for utøvere 12 år eller yngere.</h2>
            <h2>950,- for utøvere over 12 år.</h2>
            <h2>350,- for cupgradering.</h2>
            <h2>500,- for ledsagere som ønsker mat eller overnatting i hallen.</h2>
            <p>Betaling er enten igjennom Vipps eller med kort/kontant.</p>
            <p>Vipps kan gjøres direkte fra registreringssiden! Bare velg Vipps og betal direkte.</p>
            <p>Ved kort eller kontant betales dette på leieren når man registrerer ankomst.</p>
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
                    <h1 className={styles.vinterleirTitle}>Vinterleir</h1>
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
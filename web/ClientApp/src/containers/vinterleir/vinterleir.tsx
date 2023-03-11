import { Route, NavLink, Routes } from 'react-router-dom';
import styles from './vinterleir.module.css';
import choPicture from './Cho.webp';
import vinterleirPicture from './Vinterleir.webp';

function Information() {

    return (
        <div>
            <p>Ski Taekwondo Klubb holder vår 22. vinterleir for alle TTU klubber i Follo Stil Arena!</p>
            <p>Vinterleiren er en helg fra fredag til søndag med masse taekwondomoro for alle utøvere med gradering på søndag.</p> 
            <p>Det er en ypperlig måte å bli kjent med andre utøvere fra hele Norge og trene med helt andre flinke mastere fra andre klubber og utøvere!</p>
            <a href={vinterleirPicture} target="_blank" >
                <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
            </a>
            <p>Man kan overnatte i salen dersom man ønsker det og vi har frokost, lunsj og middag for alle utøvere. Vi har også en kiosk for kaffe, mini pizza eller andre godsaker.</p>
            <p>Så kom bli med oss i Follo Stil Arena og bli med på en helg fylt med moro, spenning og god trening!</p>
            <b>
                <p>Dessverre ble vinterleiren avlyst i år også grunnet stor smittespredning og anbefalinger fra myndigheter.</p>
                <p>Vi håper alle gode ting er tre og at vi kan gjennomføre vinterleir neste år.</p>
                <p>I mellomtiden får alle ha en fin jul og godt nyttår. Pass på hverandre, så sees vi til vinterleir i 2022! 🙂</p>
            </b>
        </div>

    )
}

function Schedule() {
    return (
        <div>
            <h2>Informasjon for Ski Taekwondo Klubb:</h2>
            <div className={styles.flyerGrid}>
                <button className={styles.registrationButton} onClick={() => window.open("/invitasjonvinterleir2021barn.pdf")}>Informasjon - Barn</button>
                <button className={styles.registrationButton} onClick={() => window.open("/invitasjonvinterleir2021voksen.pdf")}>Informasjon - Voksen</button>
            </div>
            <h2>Informasjon for andre klubber:</h2>
            <button className={styles.registrationButton} onClick={() => window.open("/invitasjonvinterleir2021ekstern.pdf")}>Informasjon - Eksterne klubber</button>
        </div>
    )
}

function Priser() {
    return (
        <div>
            <p>Her er prisene for vinterleiren 2021:</p>
            <h2>825,- for utøvere 12 år eller yngere.</h2>
            <h2>975,- for utøvere over 12 år.</h2>
            <h2>350,- for cupgradering.</h2>
            <h2>500,- for ledsagere som ønsker mat eller overnatting i hallen.</h2>
            <p>Betaling er enten igjennom Vipps eller med kort/kontant.</p>
            <p>Vipps kan gjøres direkte fra registreringssiden! Bare velg Vipps og betal direkte.</p>
            <p>Ved kort eller kontant betales dette på leieren når man registrerer ankomst.</p>
        </div>
    )
}

function Vinterleir() {

    return (
        <div className={`${styles.vinterleirGrid} slideLeft`}>
            <div className={styles.picture}>
                <img src={choPicture} alt="Barnepartiet"/>
            </div>
            <div className={styles.textSide}>
                <Routes>
                    <h1 className={styles.vinterleirTitle}>Vinterleir</h1>
                    <div className={styles.subButtons}>
                        <NavLink to="/" className={( { isActive } ) => isActive ? styles.buttonActive : ""}>
                            <button>
                                <span>Informasjon</span>
                            </button>
                        </NavLink>
                        <NavLink to="/schedule" className={( { isActive } ) => isActive ? styles.buttonActive : ""}>
                            <button>Program og flyer</button>
                        </NavLink>
                        <NavLink to="/priser" className={( { isActive } ) => isActive ? styles.buttonActive : ""}>
                            <button>Priser</button>
                        </NavLink>
                    </div>

                    <Route path='/' element={ <Information /> } />
                    <Route path='/schedule' element={ <Schedule/> } />
                    <Route path='/priser' element={ <Priser/> } />
                </Routes>
            </div>
        </div>
    )
}

export default Vinterleir;
import styles from './kontakt.module.css';

function Kontakt() {
    return (
        <div className={`${styles.kontaktGrid} slideLeft`}>
            <div className={styles.picture}>
                <p>Bilde av utsiden av Ski Taekwondo Klubb her.</p>
            </div>
            <div className={styles.textSide}>
                <h1>Kontakt oss</h1>
                <p>Vi er tilgjenglig på Facebook og på epost!</p>
                <div className={styles.kontaktButtons}>
                    <a href="https://www.facebook.com/SkiTaekwondoKlubb" target="_blank"><button>Facebook</button></a>
                    <a href="mailto: kontakt@skitaekwondo.no" target="_blank"><button>Epost</button></a>
                    <a href="mailto: dicte1906@gmail.com" target="_blank"><button>Foreldrekontakt</button></a>
                    <a href="mailto: leder@skitaekwondo.no" target="_blank"><button>Leder</button></a>
                </div>

                <p>Vi er også tilgjenglige fysisk i <a href="https://www.google.com/maps/place/Industriveien+17,+1400+Ski" target="_blank">Industriveien 17, 1401 Ski.</a></p>
            </div>
        </div>
    )
}

export default Kontakt;
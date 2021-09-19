import styles from './partnere.module.css';
import follolaas from './pictures/follolaas.webp'
import bingoland from './pictures/bingoland.webp'
import bryntrykkservice from './pictures/bryn_trykkservice.webp'
import donpablo from './pictures/don_pablo.webp'
import dytt from './pictures/dytt.webp'
import folloror from './pictures/follo_rorleggerservice.webp'

function Partnere() {
    return (
        <div className={`${styles.partnere} slideLeft`}>
            <h1>Samarbeidspartnere</h1>
            <p>Disse partnerne er med på å få Ski Taekwondo Klubb til gå rundt.</p>
            <p>Tusen takk til alle våre samarbeidspartnere!</p>
            <div className={styles.partnerePictureGrid}>
                <img onClick={() => window.open("https://follolas.no")} src={follolaas} alt="Follo Lås og Glass-Sikring AS" />
                <img onClick={() => window.open("https://folloror.no")} src={folloror} alt="Follo Rørløggerservice" />
                <img onClick={() => window.open("https://dytt.no")} src={dytt} alt="Dytt.no" />
                <img onClick={() => window.open("https://bingoland.no")} src={bingoland} alt="Bingoland" />
                <img onClick={() => window.open("http://donpablos.no")} src={donpablo} alt="Don Pablos Pizza" />
                <img onClick={() => window.open("https://bryntrykkservice.no")} src={bryntrykkservice} alt="Bryn Trykkservice AS"/>
                <p className={styles.pitch}>Har ditt firma lyst til å bli med oss? Ta gjerne kontakt: <a href="mailto: kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            </div>
        </div>
    )
}

export default Partnere;
import styles from './partnere.module.css';

function Partnere() {
    return (
        <div className={`${styles.partnere} slideLeft`}>
            <h1>Samarbeidspartnere</h1>
            <p>Disse partnerne er med på å få Ski Taekwondo Klubb til gå rundt.</p>
            <p>Tusen takk til alle våre samarbeidspartnere!</p>
            <div className={styles.partnerePictureGrid}>
                <img onClick={() => window.open("https://follolas.no")} src="/pictures/partnere/follolaas.png" />
                <img onClick={() => window.open("https://folloror.no")} src="/pictures/partnere/follo_rorleggerservice.png" />
                <img onClick={() => window.open("https://dytt.no")} src="/pictures/partnere/dytt.jpg" />
                <img onClick={() => window.open("https://bingoland.no")} src="/pictures/partnere/bingoland.png" />
                <img onClick={() => window.open("http://donpablos.no")} src="/pictures/partnere/don_pablo.png" />
                <img onClick={() => window.open("https://bryntrykkservice.no")} src="/pictures/partnere/bryn_trykkservice.png" />
                <p className={styles.pitch}>Har ditt firma lyst til å bli med oss? Ta gjerne kontakt: <a href="mailto: kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            </div>
        </div>
    )
}

export default Partnere;
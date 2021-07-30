import styles from './partnere.module.css';

function Partnere() {
    return (
        <div className={`${styles.partnere} slideLeft`}>
            <h1>Samarbeidspartnere</h1>
            <p>Disse partnerne er med på å få Ski Taekwondo Klubb til gå rundt.</p>
            <p>Tusen takk til alle våre samarbeidspartnere!</p>
            <div className={styles.partnerePictureGrid}>
                <img onClick={() => window.open("https://follolas.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/follolaas.png`} />
                <img onClick={() => window.open("https://folloror.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/follo_rorleggerservice.png`} />
                <img onClick={() => window.open("https://dytt.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/dytt.jpg`} />
                <img onClick={() => window.open("https://bingoland.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/bingoland.png`} />
                <img onClick={() => window.open("http://donpablos.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/don_pablo.png`} />
                <img onClick={() => window.open("https://bryntrykkservice.no")} src={`${process.env.PUBLIC_URL}/pictures/partnere/bryn_trykkservice.png`} />
                <p className={styles.pitch}>Har ditt firma lyst til å bli med oss? Ta gjerne kontakt: <a href="mailto: kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a></p>
            </div>
        </div>
    )
}

export default Partnere;
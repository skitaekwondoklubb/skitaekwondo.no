
import styles from './arrangementer.module.css';
import vinterleirPicture from '../vinterleir/Vinterleir.webp';
import { Link } from 'react-router-dom';

function Arrangementer() {
    const currentDate = new Date();
    const earlyLimit = new Date(`${currentDate.getFullYear()}-10-01`);
    const prettyEarlyLimit = new Date(`${currentDate.getFullYear()}-11-01`);
    
    const isEarly = currentDate < earlyLimit;
    const isPrettyEarly = currentDate >= earlyLimit && currentDate < prettyEarlyLimit;

    function month() {

    }

    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.textSide}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>

                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
                <p>Tidspunkt: 2025</p>
                {/* <div className={styles.smallInfo}>
                    <label>1025,- (Barn 12 år eller yngere)</label>
                    <label>1200,- (13 år eller eldre)</label>
                </div>
                
                <div className={`${styles.margin} ${styles.smallInfo}`}>
                    <a target="_blank" href="/invitasjon_vinterleir_2024.pdf">Invitasjon til vinterleir 2024</a>
                </div> */}

                {/* {currentDate < prettyEarlyLimit && <h3>Registrer deg tidlig og få rabatt! -{isEarly ? 20 : 10}% på registrering av utøver i {isEarly ? "september" : "oktober"}.</h3>} */}
                {/* <p>Ski Taekwondo Klubb vil i god tradisjon holde en vinterleir i 2025. 
                    Vi gleder oss masse til å ha treninger, sosial moro og graderinger!</p>
                <p>Vinterleieren er Ski Taekwondo Klubbs største arrangement hvor klubber fra hele skandinavia blir invitert 
                    til Follo Stil Arena i Nordre Follo for å trene sammen med mastere fra hele landet og møte gamle og nye venner fra andre klubber.</p>
                <p>Dangradering vil gjennomføres i hallen på fredag. Det vil kun være gradering for barnepartiet i Ski Taekwondo Klubb på søndagen.</p> */}
                <p>Tusen takk til alle som møtte opp på Ski Taekwondo Klubbs vinterleir 2024!</p>
                <p>Bildene er under sortering og vil legges ut om kort tid.</p>
                <p>Må alle ha god jul og et godt nytt år! Så sees vi til vinterleieren 2025!</p>
                
                {/* <div className={styles.subButtons}>
                </div>
                <div className={styles.subButtons}>
                    <Link to="/vinterleir/registrering/"><button className={styles.registrationButton}>Registrering</button></Link>
                    <Link to="/vinterleir/program"><button className={styles.registrationButton}>Program</button></Link>

                    <Link to="/vinterleir/deltakere"><button className={styles.registrationButton}>Deltakerliste</button></Link>
                </div> */}
            </div>
        </div>
    )
}

export default Arrangementer;
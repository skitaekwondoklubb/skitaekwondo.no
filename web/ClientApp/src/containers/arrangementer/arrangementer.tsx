
import styles from './arrangementer.module.css';
import vinterleirPicture from '../vinterleir/Vinterleir.webp';

function Arrangementer() {
    return (
        <div className={`${styles.arrangementerGrid} slideLeft`}>
            <div className={`${styles.textSide}`}>
                <h1>Arrangementer i Ski Taekwondo Klubb</h1>
                <h2><a href="/oversikt2023.pdf" target={"_blank"}>Generell treningsoversikt 2023</a></h2>
                <p>Vi holder flere arrangementer i Ski Taekwondo Klubb hvert år, en av gjengangerne er Ski Taekwondo Klubbs vinterleir i desember.</p>
                <p>Følgende arrangementer er på agendaen i 2023:</p>

                <hr/>

                {/* <h2>Borgertoget i Ski</h2>
                <h3>Dato: onsdag 17. mai.</h3>
                <p>Tradisjon tro går vi i borgertoget i Ski! Møt opp i nystrøken dokbok så går vi sammen fra utenfor Don Pablos Pizza sammen med resten av toget.</p>

                <hr/>

                <h2>Gradering i Ski Taekwondo Klubb</h2>
                <h3>Dato: Søndag 11. juni (barn) og ungdom/voksen mandag 12. juni.</h3>
                <p>Graderingen for barn vil være 11. juni, imens ungdom og voksne vil være 12. juni.</p>

                <hr/>

                <h2>45. års jubileum med sommeravslutning</h2>
                <h3>Dato: søndag 18. juni</h3>
                <p>Vi skal feire vårt 45. års jubileum den 18. juni og har sommeravslutning samme dag. Egen påmelding om dette vil komme senere.</p>

                <hr/>

                <h2>Siste treningsdager før sommerferien</h2>
                <h3>Dato: onsdag 21. juni</h3>
                <p>Barn vil ha sin siste treningsdag 21. juni. For ungdom/voksen vil det være fellestrening med 4. cup og opp 19. og 21. juni.</p>

                <hr/> */}

                <h2>Sommerskole på Ski Taekwondo Klubb</h2>
                <h3>Dato: 14-16. august</h3>
                <p>Ytterligere informasjon om dette arrangementet vil komme forløpende.</p>

                <hr/>

                <h2>Vinterleir i Ski Taekwondo Klubb</h2>
                <a href={vinterleirPicture} target="_blank" >
                    <img src={vinterleirPicture} alt="Fellesbilde vinterleir" className={styles.textPicture} />
                </a>
  
                <h3>Dato: Forhåpentligvis tidlig desember 2023.</h3>
                {/* <h3>Pris: 975,- for voksen, 825,- for barn.</h3> */}
                {/* <div className={styles.invitations}>
                    <a href="/vinterleir2022_barn.pdf" target={"_blank"}>Invitasjon - Barn.</a>
                    <a href="/vinterleir2022_ungvoks.pdf" target={"_blank"}>Invitasjon - Ungdom/Voksen.</a>
                </div>

                <Link to={"/program"}>
                    <button className={styles.registrationButton}>Program - Vinterleir 2022</button>
                </Link> */}
{/* 
                <Link to={"/vinterleirregistrering"}>
                    <button className={styles.registrationButton}>Registrering til vinterleir</button>
                </Link> */}
{/* 
                <div className={styles.spaceLinks}>
                    <Link to="/vinterleirdeltakere">Du kan se en liste over påmeldte her.</Link>
                </div> */}

                <p>Tusen takk for et kjempebra comeback i 2022!</p>
                {/* <p>Vinterleieren er en sosial sammenkomst mellom medlemmer i mange forskjellige TTU klubber. Denne gangen er det fra 2. desember til 4. desember.</p> 
                <p>Her trener vi, er sosiale med hverandre og har det kjempegøy. Igjen kommer mange flinke mastere fra hele landet til å instruere.</p>
                <p>Vi gleder oss masse og håper mange deltar på Ski Taekwondo Klubbs vinterleir 2022!</p> */}
            </div>
        </div>
    )
}

export default Arrangementer;
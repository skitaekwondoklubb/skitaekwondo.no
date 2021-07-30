import styles from './utstyr.module.css';

function Utstyr() {
    return (
        <div className={`${styles.utstyrGrid} slideLeft`}>
            <div className={styles.picture}>
                <img src={`${process.env.PUBLIC_URL}/pictures/utstyr/overtrekk${Math.floor(Math.random() * (5-1) + 1)}.png`} />
            </div>
            <div className={styles.textSide}>
                <h1>Utstyr</h1>
                <h2>Overtrekksdrakter og klubbutstyr:</h2>
                <p>Ski Taekwondo Klubb har inngått en avtale med Sport-X om salg av overtrekksdrakter, t-skjorter o.l med klubbens logo og eventuelt navnetrykk på ryggen etter klubbens mal.</p>
                <p>Alle som ønsker dette kan kjøpe dette fra Sport-X sine nettsider.</p>
                <button onClick={() => window.open("https://sport-x.no/avdeling/klubbshop/ski-taekwondo-klubb")}>Ski Taekwondo Klubb klubbshop</button>
                <p>Priser og bestillingsrutiner står på samme nettside. Sport-X tar av seg hele prosessen og alle spørsmål rundt bestillinger må rettes til Sport-X.</p>

                <h2>Drakter, merker, teoribøker:</h2>
                <p>Denne typen utstyr kan du finner i kiosken på Ski Taekwondo Klubb sin Vipps: 15550.</p>
                <p>Etter kjøp kan man snakke med en instruktør for å få varen utdelt.</p>
                <p>Man kan også finne drakter på:</p>
                <div className={styles.otherShopsButtons}>
                    <button onClick={() => window.open("https://www.ttu.no/index.php?cat=162293")}>TTU Shop</button>
                    <button onClick={() => window.open("https://www.fighter.no")}>Fighter.no*</button>
                </div>
                <small>* Ikke alle drakter er godkjente. Noen har merker, navn, flagg og lignende som ikke skal være på draktene. Ta gjerne kontakt med oss hvis du er usikker på hva som er godkjent.</small>
            </div>
        </div>
    )
}

export default Utstyr;
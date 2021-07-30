import styles from './omoss.module.css';

function OmOss() {
    return (
        <div className={`${styles.omOssGrid} slideLeft`}>
            <div className={styles.picture}>
                <img src="/pictures/skitkd_logo.png"/>
            </div>
            <div className={styles.textSide}>
                <h1>Om Ski Taekwondo Klubb</h1>
                <p>Ski Taekwondo klubb ble stiftet i 1978 av Tien Ton That og Pablo Lopez og er en av de eldste Taekwondoklubbene i Norge.</p>
                <p>Siden den gang blitt en klubb med mange meritter og med egne mastere og dyktige instruktører.</p>
                <p>I dag ledes klubben av Master Svein Andersstuen som innehar 8. Dan. og er medlem av TTU, Traditional Taekwondo Union.</p>
                <p>Vi har et eget lokale i <a href="https://www.google.com/maps/place/Industriveien+17,+1400+Ski" target="_blank">Industriveien 17 i Ski</a> ikke så langt unna Ski Bygg.</p>
                <p>Kom gjerne å besøk oss! Vi tilbyr prøvetimer slik at man kan prøve seg frem før man starter.</p>
                <h2>Ønskes mye mer historie her...</h2>
            </div>
        </div>
    )
}

export default OmOss;
import React from 'react';
import { HashRouter, Link, NavLink, Route, useHistory } from 'react-router-dom';
import RandomizedBackground from './randomizedbackground';
import styles from './home.module.css'
import { getClubs } from '../../services/clubService';


function Treningstider() {
    return (
        <div className={`${styles.treningstider} slideLeft`}>
            <h1>Treningstider</h1>
            <h2>Barn:</h2>
            <p>Mandag og onsdag: 18:10 - 19:20 (nybegynner)</p>
            <p>Mandag og onsdag: 18:00 - 19:15 (videregående)</p>
            <p>Lørdag 12:00 - 13:00</p>
            <h2>Ungdom/voksen:</h2>
            <p>Tirsdag og torsdag: 18:00 - 19:30</p>
            <h2>Rødt og svart belte:</h2>
            <p>Mandag og onsdag: 19:30 - 21:00</p>
            <Link to="/"><button className={styles.backButton}>Tilbake</button></Link>
        </div>
    )
}

function Home() {
    const history = useHistory();

    const titles = [
        "Hånd, fot, veien å gå",
        "Lær selvforsvar",
        "Kroppsbeherskelse"
    ]
    return (
        <div className={styles.home}>
            <RandomizedBackground/>
            <div className={styles.homeGrid}>
                <div className={styles.infoBox}>
                    <HashRouter>
                        <Route exact path="/">
                            <div className={styles.start}>
                                <h1 className={styles.title}>{titles[Math.floor(Math.random()*titles.length)]}</h1>
                                <p>Ski Taekwondo Klubb er en av Norges eldste taekwondo klubber</p>
                                <div className={`${styles.infoBoxButtons} fadeInSlow`}>
                                    <button onClick={() => history.push("/omoss")}>Les mer</button>
                                    <Link to="/treningstider"><button>Treningstider</button></Link>
                                </div>
                                <div className={`${`${styles.infoBoxButtons} ${styles.infoBoxExtraButtonMargin}`} fadeInSlow`}>
                                    <a href="/program"><button>Program - Vinterleir 2022</button></a>
                                </div>
                            </div>
                        </Route>
                        <Route exact path ="/treningstider">
                            <Treningstider/>
                        </Route>
                    </HashRouter>

                </div>
            </div>
        </div>
    )
}

export default Home;
import React from 'react';
import { HashRouter, Link, NavLink, Route } from 'react-router-dom';
import styles from './teori.module.css';
import mom from './pictures/mom_kroppen.webp';
import taegeuki from './pictures/taegeuki.webp'
import RandomBooks from './randombooks';

function TeoriInformation() {
    return (
        <div>
            <p>Kunnskap om kropp, teknikk, skikk og respekt er i senter av taekwondo. Forståelse om taekwondos regler, prinsipper og verdier kommer ikke kun igjennom fysisk trening.</p>
            <p>Vi har et stort pensum som skal læres og tas til hjertet. Det kan til tider være overveldende, men regelmessig lesing hjelper mye.</p>
            <p>På disse sidene ligger det mye grunnleggende informasjon og krav til gradering.</p>
            <h2>Ytterligere teori:</h2>
            <p>Vi har også tre valgfrie teoribøker laget av Grandmaster Cho Woon Sup til 299,- per stk. Disse bøkene inneholder alle teknikker, poomser og avtalt kamp.</p>
            <p>En perfekt bursdag eller julegave for en utøver, spør gjerne instruktørene eller send oss en mail dersom en ønskes å kjøpes.</p>
        </div>
    )
}

function Taegeuki() {
    return (
        <div className={`${styles.theory} fadeIn`}>
            <img src={taegeuki} className={styles.clickablePicture} alt="Taegeuki" onClick={() => window.open(taegeuki)}/>
            <p>Taegeukgi kan deles inn i tre deler. Den hvite bakgrunnen, den røde og blå "taegeuk" i midten og de fire triagrammene.</p>
            <p>Det Sør-Koreanske nasjonalflagget, Taegeuk betyr opprinnelsen til alle ting i universet. Den hvite bakgrunnen symboliserer renhet og fred. 
                Sirkelen i midten er en delt rød og blå del med en horisontal ”S”. 
                Disse røde og blå delene er basert på den taoistiske filosofien om Yin og Yang, (kalt Um og Yang på koreansk.
            </p>
            <p>Dette omhandler teorien om universets evige dualitet som eksisterer innenfor naturen (for eksempel himmel og jord, lys og mørke, varme og kulde, liv og død, mann og kvinne...).
                Disse dualitetene eksisterer som ett prinsipp for universets eksistens.
            </p>
            <h2>Gwe:</h2>
            <p>De fire trigrammene ”Gwe”(strekmønstrene) i de fire hjørnene av flagget er hentet fra endringens bok "I-Ching". Plassering av Gwe'ene representerer bl.a kompassets fire punkter og naturens kretsløp.</p>
            <p>Ee-Gwe nederst i venstre hjørne viser til våren og soloppgang, det tidlige sollyset da sola står opp i øst.</p>
            <p>Kun-Gwe øverst til venstre representerer sommer og sterkt sollys da sola står i syd.</p>
            <p>Kam-Gwe øverst i høyre hjørne symboliserer høsten og skumringen da sola beveger seg lenger mot vest.</p>
            <p>Kon-Gwe nederst til høyre representerer vinteren og totalmørket da sola står i nord. Sammen utrykker disse symbolene universets mysterier.</p>
            <h2>Taegeuk:</h2>
            <p>Taegeuk er bygget opp rundt disse 4 gweene, som hver består av tre streker, enten hele eller delte. Disse kan igjen danne åtte triagrammer, derfor de åtte taegeuk.</p>
            <p>Disse åtte triagrammene kaller vi Palgwe ( pal = 8). Taegeuk er derfor bygd opp etter disse 8 trigramene - Palgwe. 
                Poomsene er som sagt mønstre bygd opp av taegeuk filosofien, som gjør at vi etter hvert som vi lærer poomsene for innsikt i teorien.
            </p>
        </div>
    )
}

function Mom() {
    return (
        <div className={`${styles.theory} fadeIn`}>
            <img src={mom} alt="Kroppen" className={styles.clickablePicture} onClick={() => window.open(mom)} />
        </div>
    )
}


function Pensum() {
    return (
        <div className={`${styles.pensum} fadeIn`}>
            <p>Vi har et pensumhefte laget av Tom, en av våre engasjerte medlemmer. Han har samlet en hel masse krav og teori til gradering.</p>
            <p>Traditional Taekwondo Union har også informasjon om krav til både cupgradering og dangradering.</p>
            <div className={styles.pensumGrid}>
                <button onClick={() => window.open("/Ski-TKD-Pensumpdf.pdf")}>Ski Taekwondo Klubb pensumhefte</button>
                <button onClick={() => window.open("https://www.ttu.no/cup-pensum.414084.no.html")}>TTU krav cupgradering</button>
                <button onClick={() => window.open("https://www.ttu.no/dan-pensum.414086.no.html")}>TTU krav dangradering</button>
            </div>
        </div>
    )
}

function Teori() {
    return (
        <div className={`${styles.teoriGrid} slideLeft`}>
            <div className={styles.picture}>
                <RandomBooks/>
                <p>Teoribøkene er 299,- per stk</p>
            </div>
            <div className={styles.textSide}>
                
                <div className={styles.title}>
                    <h1>Teori og pensum</h1>
                </div>
                <HashRouter>
                    <div className={styles.teoriNavigation}>
                        <NavLink to="/taegeukgi" activeClassName={styles.buttonActive}>
                            <button>Taegeukgi</button>
                        </NavLink>
                        <NavLink to="/mom" activeClassName={styles.buttonActive}>
                            <button>Kroppen</button>
                        </NavLink>
                        <NavLink to="/pensum" activeClassName={styles.buttonActive}>
                            <button>Pensum</button>
                        </NavLink>
                    </div>
                    <Route exact path="/">
                        <TeoriInformation/>
                    </Route>
                    <Route path="/taegeukgi" >
                        <Taegeuki/>
                    </Route>
                    <Route path="/mom">
                        <Mom/>
                    </Route>
                    <Route path="/pensum">
                        <Pensum/>
                    </Route>
                </HashRouter>
            </div>
        </div>
    )
}

export default Teori;
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import styles from './omoss.module.css';
import logo from '../skitkd_logo.webp';
import React from 'react';

function OmTaekwondo() {
    return (
        <div className="fadeIn">
            <h2>Om Taekwondo</h2>
            <p>Taekwondo er en sørkoreansk kampkunst og Sør-Korea sin nasjonalsport.</p>
            <p>Ordet taekwondo betyr spark, slag og veien å gå og sporten har dermed stort fokus på selvforsvar, spark og slag, men det er også kroppsbeherskelse, fokus og disiplin.</p>
            <p>Selv om taekwondo er en fullkontakt kampsport så handler sporten om mye mer enn kun kamp og sparring.</p>
            <p> Utøverne læres i grunnteknikker, hvordan bevege kroppen i tillegg til mønster (poomsae), avtalte kampsituasjoner, komme ut av grep, anaerob og aerob trening, meditasjon, kontroll på pust og sinn, etikette, respekt og selvutvikling.</p>
        </div>
    )
}

function OmSkiTaekwondo() {
    return (
        <div className="fadeIn">
            <h2>Ski Taekwondo Klubb:</h2>
            <p>Ski Taekwondo klubb ble stiftet i 1978 av Tien Ton That og Pablo Lopez og er en av de eldste Taekwondoklubbene i Norge.</p>
            <p>Siden den gang blitt en klubb med mange meritter og med egne mastere og dyktige instruktører.</p>
            <p>Ski Taekwondo Klubb har også et aktivt konkurranseparti som deltar i NM og europamesterskap.</p>
            <p>I dag ledes klubben av Master Svein Andersstuen som innehar 8. Dan. og er medlem av TTU, Traditional Taekwondo Union.</p>
            <p>Vi er en del av <a href={"https://www.ttu.no/"} target="_blank" rel='noreferrer'>Traditional Taekwondo Union</a> grunnlagt av Grandmaster Cho Woon Sup som opprettholder de tradisjonelle prinsippene og verdiene i taekwondo.</p>
            <p>Igjennom TTU er vi også en del av World Taekwondo (tidligere kjent som World Taekwondo Federation).</p>

            <h2>Lokaler</h2>
            <p>Vi har et eget lokale i <a href="https://www.google.com/maps/place/Industriveien+17,+1400+Ski" target="_blank" rel='noreferrer'>Industriveien 17 i Ski</a> ikke så langt unna Ski Bygg.</p>
            <p>Kom gjerne å besøk oss! Vi tilbyr prøvetimer slik at man kan prøve seg frem før man starter.</p>
        </div>
    )
}

function Navigation() {
    return (
        <React.Fragment>
            <h1>Om Ski Taekwondo Klubb</h1>
            <div className={styles.subButtons}>
                <NavLink to="oss" className={({ isActive }) => isActive ? styles.buttonActive : ""}>
                    <button>
                        <span>Om oss</span>
                    </button>
                </NavLink>
                <NavLink to="taekwondo" className={({ isActive }) => isActive ? styles.buttonActive : ""}>
                    <button>Taekwondo</button>
                </NavLink>
            </div>
        </React.Fragment>
    )
}

function OmOss() {
    return (
        <div className={`${styles.omOssGrid} `}>
            <div className={`${styles.picture} fadeInHomeBG`}>
                <img src={logo} alt="Ski taekwondo klubb sin logo"/>
            </div>
            <div className={`${styles.textSide} slideLeft`}>
                <Navigation/>
                <Routes>
                    <Route path='oss' element={ <OmSkiTaekwondo/> }/>
                    <Route path='taekwondo' element={ <OmTaekwondo/> }/>
                    <Route path='/' element={ <Navigate to="oss" /> }/>
                </Routes>
            </div>
        </div>
    )
}

export default OmOss;
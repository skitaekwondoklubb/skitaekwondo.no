import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from '../containers/home/home';
import OmOss from '../containers/omoss/omoss';
import Barneparti from '../containers/barneparti/barneparti';
import UngdomVoksenpartiet from '../containers/ungdomvoksen/ungdomvoksen';
import Teori from '../containers/teori/teori';
import Partnere from '../containers/partnere/partnere';
import Utstyr from '../containers/utstyr/utstyr';
import Kontakt from '../containers/kontakt/kontakt';
import MobileMenu from './mobileMenu';
import Navigation from './navigation';
import styles from './navigation.module.css';
import Arrangementer from '../containers/arrangementer/arrangementer';
import Vinterleir from '../containers/vinterleir/vinterleir';
import CheckVippsPayment from '../containers/registrering/checkVippsPayment';
import VinterleirAdministration from '../containers/vinterleirpublic/administration';
import Agenda from '../containers/vinterleiragenda/agenda';
import VinterleirRegistrering from '../containers/vinterleir/vinterleirregistrering';
import VinterleirPublic from '../containers/vinterleirpublic/vinterleirpublic';
import PrintAgenda from '../containers/vinterleiragenda/printagenda';

function MainRouting() {


  return (
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`} >
        <Navigation/>
        <div className={styles.mainContent}>
          <Routes>
                <Route path="/*" element={ <Home/> }/>
                <Route path="/menu" element={ <MobileMenu/> }/>
                <Route path="/om/*" element={ <OmOss/> }/>
                <Route path="/barnepartiet/*" element={ <Barneparti/> }/>
                <Route path="/ungdomvoksenpartiet/*" element={ <UngdomVoksenpartiet /> }/>
                <Route path="/teori/*" element={ <Teori /> }/>
                <Route path="/samarbeidspartnere/*" element={ <Partnere/> }/>
                <Route path="/utstyr/*" element={ <Utstyr/> }/>
                <Route path="/kontakt/*" element={ <Kontakt/> }/>
                <Route path="/vinterleir/*" element={ <Vinterleir/> }/>
                <Route path="/arrangementer/*" element={ <Arrangementer/> }/>
                <Route path="/vinterleir/registrering/*" element={ 
                  <div className={styles.expiredRegistration}>
                    <h1>Registrering til vinterleir</h1>
                    <p className={styles.smallGap}>Fristen for registrering har utgått. </p>
                    <p className={styles.bigGap}> Hvis du fortsatt ønsker å være med må du ta kontakt med oss på <a href='mailto:kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a>.</p>
                    <div className={styles.extraButtons}>
                      <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
                      {/* <Link to="/vinterleirdeltakere"><button className={`${styles.backButton} ${styles.otherButton}`}>Til deltakerliste</button></Link> */}
                    </div>
                  </div>
                 }/>

                {/* <Route path="/vinterleir/etterregistrering/*" element={ <VinterleirRegistrering /> }/> */}
                {/* <Route path="/vinterleir/deltakere" element={<VinterleirPublic />}/> */}
                {/* <Route path="/vinterleir/program" element={ <Agenda /> }/> */}
                {/* <Route path="/vinterleir/program/print/*" element={ <PrintAgenda /> }/> */}
                {/* <Route path="/vinterleir/deltakere/admin" element={<VinterleirAdministration/>}/> */}
                {/* <Route path="/vipps/:ordreId" element={ <CheckVippsPayment type={"Vinterleir"} /> } /> */}
          </Routes>
        </div>
    </BrowserRouter>
  )
}


                // {/* <Route path="/vipps/gradering/:ordreId" element={<CheckVippsPayment type={"Gradering"}/>} />
                // <Route path="/vipps/tshirt/:ordreId" element={<CheckVippsPayment type={"T-skjorte"}/>} /> */}
                /* <Route path="/vinterleir/etterregistrering">
                  <VinterleirRegistrering />
                </Route> */


                  // </div>
  /* 
                <Route path="/graderingregistrering/*" element={
                  <SimpleRegistrationRouting />
                }/> */
                /* <Route path="/tskjorte/*" element={
                  <TshirtRouting  />
                }/> */
                /* <Route path="/jubileum/*" element={
                  <JublieumRouting  />
                }/> */
    /*             
                <Route exact path="/registrering">
                  <div className={styles.expiredRegistration}>
                    <h1>Danseminaret er ferdig</h1>
                    <p>Så du trenger ikke registrere deg igjen 🙂</p>
                    <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
                  </div>
                </Route> */

export default MainRouting;
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
import SimpleRegistrationRouting from '../containers/graderingregistrering/simplegraderingrouting';
import { GraderingType } from '../models/registrationModels';
import JublieumRouting from '../containers/jublieumregistrering/tshirtrouting';
import SkoleRouting from '../containers/skoleregistrering/skolerouting';
import VinterleirRegistrering from '../containers/vinterleir/vinterleirregistrering';
import VinterleirPublic from '../containers/vinterleirpublic/vinterleirpublic';
import Agenda from '../containers/vinterleiragenda/agenda';
import PrintAgenda from '../containers/vinterleiragenda/printagenda';
import VinterleirAdministration from '../containers/vinterleirpublic/administration';
import CheckVippsPayment from '../containers/registrering/checkVippsPayment';
import NewMemberRouting from '../containers/newmember/newmemberRouting';
import NewMemberData from '../containers/newmember/admin/newmemberData';

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

                <Route path="/graderingregistrering" element={
                  <div className={styles.expiredRegistration}>
                    <h1>Graderingsregistrering</h1>
                      <h3 className={`${styles.smallGap}`}><b><u>Du trenger ikke registrere deg til gradering.</u></b></h3>
                      <p className={`${styles.smallGap}`}>Det er ingen registrering på nettet for gradering.</p>
                      <p>For å kunne prøve å gradere må følgende være oppfylt:</p>
                      <ul className={`${styles.smallList} ${styles.smallGap}`}>
                        <li>Du må ha fullført teori og fysisk test.</li>
                        <li>Du må ha godt nok oppmøte.</li>
                        <li>Du må føle at du selv er klar til gradering.</li>
                        <li>Du må ha med medlemspass på gradering.</li>
                        <li>Du skal ha godkjennelse til å gradere fra Master Tom Lasse.</li>
                      </ul>
                      <p className={`${styles.smallGap}`}>Hvis alle kravene er oppfylt kan du møte opp på gradering tirsdag 21. januar klokken 18.</p>
                      <p>Lykke til!</p>
                  </div>
                }/>

                <Route path="/nyttmedlem" element={ <NewMemberRouting /> } />
                <Route path="/nyttmedlem/sjekk" element={ <NewMemberData /> } />

                {/* {
                <Route path="/vinterleir/registrering/*" element={ 
                  <div className={styles.expiredRegistration}>
                    <h1>Registrering til vinterleir</h1>
                    <p className={styles.smallGap}>Fristen for registrering har utgått. </p>
                    <p className={styles.bigGap}> Hvis du fortsatt ønsker å være med, ta kontakt med oss på <a href='mailto:kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a>.</p>
                    <div className={styles.extraButtons}>
                      <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
                    </div>
                  </div>
                 }/>
                } */}


                {/* <Route path="/gradering/barn" element={
                  <SimpleRegistrationRouting type={GraderingType.Children} />
                }/>



                <Route path="/sommeravslutning" element={
                  <JublieumRouting />
                } /> */}

                {/* <Route path="/sommerskole/registrering" element={
                  <SkoleRouting />
                } /> */}

                {/* <Route path="/vinterleir/etterregistrering/*" element={ <VinterleirRegistrering /> }/>
                <Route path="/vinterleir/deltakere" element={<VinterleirPublic />}/>
                <Route path="/vinterleir/program" element={ <Agenda /> }/>
                <Route path="/vinterleir/program/print/*" element={ <PrintAgenda /> }/>
                <Route path="/vinterleir/deltakere/admin" element={<VinterleirAdministration/>}/> */}
                {/* <Route path="/vipps/:ordreId" element={ <CheckVippsPayment type={"Vinterleir"} /> } /> */}
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default MainRouting;
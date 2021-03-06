import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
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
import VinterleirRegistrering from '../containers/vinterleir/vinterleirregistrering';
import Registrering from '../containers/registrering/registrering';
import SimpleGradering from '../containers/graderingregistrering/simplegradering';
import SimpleRegistrationRouting from '../containers/graderingregistrering/simplegraderingrouting';
import CheckGraderingVippsPayment from '../containers/graderingregistrering/checkGraderingVippsPayment';

function MainRouting() {
  return (
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`} >
        <Navigation/>
        <div className={styles.overflow}>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/menu">
              <MobileMenu/>
            </Route>
            <Route path="/omoss">
              <OmOss/>
            </Route>
            <Route path="/barnepartiet">
              <Barneparti/>
            </Route>
            <Route path="/ungdomvoksenpartiet">
              <UngdomVoksenpartiet />
            </Route>
            <Route path="/teori">
              <Teori />
            </Route>
            <Route path="/samarbeidspartnere">
              <Partnere/>
            </Route>
            <Route path="/utstyr">
              <Utstyr/>
            </Route>
            <Route path="/kontakt">
              <Kontakt/>
            </Route>
            <Route path="/vinterleir">
              <Vinterleir/>
            </Route>
            <Route path="/arrangementer">
              <Arrangementer/>
            </Route>
            <Route exact path="/graderingregistrering">
              <SimpleRegistrationRouting />
            </Route>
            
            <Route exact path="/registrering">
              <div className={styles.expiredRegistration}>
                <h1>Danseminaret er ferdig</h1>
                <p>S?? du trenger ikke registrere deg igjen ????</p>
                <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
              </div>
            </Route>
            <Route exact path="/vinterleirregistrering">
              <div className={styles.expiredRegistration}>
                <h1>Registrering til vinterleir</h1>
                <p>Vinterleiren ble dessverre avlyst i ??r. Vi h??per at alle gode ting er tre! ????</p>
                <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
              </div>
            </Route>
            <Route exact path="/vinterleiretterregistrering">
              <div className={styles.expiredRegistration}>
                <h1>Registrering til vinterleir</h1>
                <p>Vinterleiren ble dessverre avlyst i ??r. Vi h??per at alle gode ting er tre! ????</p>
                <Link to="/"><button className={styles.backButton}>Tilbake til hovedsiden</button></Link>
              </div>
            </Route>
            {/* <Route exact path="/vipps/:ordreId" render={(props) => <CheckVippsPayment orderId={props.match.params.ordreId}/>} /> */}
            <Route exact path="/GraderingVipps/:ordreId" render={(props) => <CheckGraderingVippsPayment orderId={props.match.params.ordreId}/>} />
          </Switch>
        </div>
    </BrowserRouter>
  )
}

export default MainRouting;
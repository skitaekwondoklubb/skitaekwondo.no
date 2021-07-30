import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import Vinterleir from '../containers/vinterleir/vinterleir';
import VinterleirRegistrering from '../containers/vinterleir/registrering';


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
            <Route exact path="/registrering">
              <VinterleirRegistrering />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  )
}

export default MainRouting;
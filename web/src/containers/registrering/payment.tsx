import { useState } from "react";
import { StepProps, Steps } from "../../models/steps";
import styles from './registration.module.css';
//import Vippshurtigkasse from "./vipps_hurtigkasse.svg";

function Gradering(props: {gradering: boolean }) {
    if(props.gradering) {
        return (
            <CheckoutRow article={`Gradering`} price={300}/>
        )
    }
    return <div/>
}

function CheckoutRow(props: { article: string, price: number }) {
    return (
        <div className={styles.checkout}>
            <span>{props.article}</span>
            <span>{props.price} kr</span>
        </div>
    )
}

interface ActualPaymentProps extends StepProps {
    goBack: () => void;
}

function PayLater(props: ActualPaymentProps) {

    function nextStep() {
        props.setCurrentStep(Steps.Done);
    }

    return (
        <div className="slideLeft">
            <p>Du kan betale med kort ved å sende penger til XX.XX.XX.XX. Send en mail til <a href="mailto:kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a> slik at vi kan godkjenne betalingen.</p>
            <p>Kontant må betales når du kommer til innsjekking på vinterleiren.</p>
            <p>Trykk neste for å fullfør registreringen til vinterleir eller gå tilbake for å endre ting først.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
        </div>
    )
}

function Vipps(props: ActualPaymentProps) {
    function nextStep() {
        props.setCurrentStep(Steps.Done);
    }

    return (
        <div className="slideLeft">
            <p>Vipps integrasjon er ikke fullført enda :( Men du kan fullføre likevel da!</p>
            <p>Takk for at du brukte Vipps betaling umiddelbart!</p>
            
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
        </div>
    )
}

function Payment(props: StepProps) {
    const [payLater, setPayLater] = useState(false);
    const [payVipps, setPayVipps] = useState(false);

    function goBack() {
        props.setCurrentStep(Steps.OtherInformation);
    }

    if(payLater) {
        return (
            <PayLater {... props} goBack={() => setPayLater(false)} />
        )
    }
    else if(payVipps) {
        return (
            <Vipps {... props } goBack={() => setPayVipps(false)}/>
        )
    }

    return (
        <div className="slideLeft">
            <p>Din registrering:</p>
            <div>
                <CheckoutRow article={`Vinterleir for utøver: ${props.registration.firstName} ${props.registration.lastName}`} price={1100}/>
                <Gradering gradering={props.registration.gradering != null && props.registration.gradering === true} />
                {
                    props?.registration?.ledsagere ? props.registration.ledsagere.map((ledsager) => {
                        return (
                            <CheckoutRow article={`Ledsager: ${ledsager.firstName} ${ledsager.lastName}`} price={ledsager.alreadyRegistred ? 0 : 1100}/>
                        )
                    })
                    : ""
                }
                <div className={styles.checkoutTotal}>
                    <span>Totalt:</span>
                    <span>{1100 + (props.registration.gradering ? 300 : 0) + (
                        props?.registration?.ledsagere 
                        ? props.registration.ledsagere.filter(x => !x.alreadyRegistred).length * 1100
                        : 0
                    )
                    } kr</span>
                </div>
            </div>
            <div className={styles.paymentButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.cashCard} onClick={() => setPayLater(true)}>Kort/Kontant</button>
                {/* <img src={Vippshurtigkasse} onClick={() => setPayVipps(true)}/> */}
            </div>
        </div>
    )
}

export default Payment;
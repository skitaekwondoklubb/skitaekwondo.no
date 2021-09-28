import { useState } from "react";
import { StepProps, Steps } from "../../models/steps";
import { sendRegistration } from "../../services/registrationService";
import { PizzaAlternatives } from "./pizzaform";
import styles from './registration.module.css';
import Loading from '../loading/loading';
//import Vippshurtigkasse from "./vipps_hurtigkasse.svg";

function Gradering(props: {gradering: boolean }) {
    if(props.gradering) {
        return (
            <CheckoutRow article={`Gradering`} price={300}/>
        )
    }
    return <div/>
}


function Pizza(props: {pizza: string }) {
    if(props.pizza !== PizzaAlternatives.None) {
        return (
            <CheckoutRow article={`Pizza`} price={80}/>
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
    total: number;
    goBack: () => void;
}

function PayLater(props: ActualPaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function nextStep() {
        setLoading(true);
        sendRegistration(props.registration).then((success: boolean) => {
            if(success) {
                props.setCurrentStep(Steps.Done);
            }
        })
        .catch((err: Error) => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    if(loading) {
        <h2>Registrerer, vennligst vent...</h2>
    }

    return (
        <div className="slideLeft">
            <div className={styles.error} hidden={error === ""}>
                <h2>Oisann! Noe gikk galt når vi prøvde å registrere deg.</h2>
                <p>Prøv igjen senere eller ta kontakt med oss på <a href="mailto: kontakt@skitaekwondo.no">kontakt@skitaekwondo.no</a>.</p>
                
                <details>
                    <summary>Teknisk feilmelding:</summary>
                    <small>{error}</small>
                </details>
            </div>
            <h2>Betaling skjer via Vipps på nummer 15550.</h2>
            <p>Skriv <u><b>navn</b></u> og <u><b>klubb</b></u> i meldingsfeltet slik at vi vet hvilken utøver du har betalt for.</p>
            <p>Hvis man ikke har Vipps kan man ta kontakt med oss for andre betalingsmuligheter.</p>
            <p>Din totale sum ble på: <b><u>{props.total}kr</u></b>.</p>
            <p>Trykk fullfør for å registrere deg til danseminar eller gå tilbake for å endre ting først.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
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
    const total = 800 + (props.registration.pizza !== PizzaAlternatives.None ? 80 : 0) + (
        props?.registration?.ledsagere 
        ? props.registration.ledsagere.filter(x => !x.alreadyRegistred).length * 1100
        : 0
    )

    function goBack() {
        props.setCurrentStep(Steps.OtherInformation);
    }

    if(payLater) {
        return (
            <PayLater {... props} total={total} goBack={() => setPayLater(false)} />
        )
    }
    else if(payVipps) {
        return (
            <Vipps {... props } total={total} goBack={() => setPayVipps(false)}/>
        )
    }

    return (
        <div className="slideLeft">
            <p>Din registrering:</p>
            <div>
                <CheckoutRow article={`Danseminar for utøver: ${props.registration.firstName} ${props.registration.lastName}`} price={800}/>
                {/* <Gradering gradering={props.registration.gradering != null && props.registration.gradering === true} /> */}
                <Pizza pizza={props.registration.pizza ? props.registration.pizza : ""}/>
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
                    <span>{total} kr</span>
                </div>
            </div>
            <div className={styles.paymentButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.cashCard} onClick={() => setPayLater(true)}>Betaling</button>
                {/* <img src={Vippshurtigkasse} onClick={() => setPayVipps(true)}/> */}
            </div>
        </div>
    )
}

export default Payment;
import { useState } from "react";
import styles from '../registrering/registration.module.css';
import Vippsbutton from "../betalmedvipps.svg";
import Loading from '../loading/loading';
import { TShirtStepProps, TShirtSteps } from "../../models/simplesteps";
import { sendTshirtRegistration } from "../../services/tshirtService";
import { TShirt } from "../../models/tshirtsizes";
import React from "react";

function TshirtItem(props: { tshirt: TShirt, isFirst: boolean }) {
    return (
        <CheckoutRow article={`T-skjorte (${props.tshirt.model}, ${props.tshirt.size})`} price={props.isFirst ? "0" : "160"}/>
    )
}

function calculateTotal(tshirts: TShirt[]) {
    return (tshirts.length -1) * 160;
}


function CheckoutRow(props: { article: string, price: string }) {
    return (
        <div className={styles.checkout}>
            <span>{props.article}</span>
            <span>{props.price}kr</span>
        </div>
    )
}

interface ActualPaymentProps extends TShirtStepProps {
    total: number;
    goBack: () => void;
}

function PayLater(props: ActualPaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function nextStep() {
        setLoading(true);
        sendTshirtRegistration(props.registration).then((success: string) => {
            if(success === "Done") {
                props.setCurrentStep(TShirtSteps.Done);
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
            <h2>Du kan betale oss når du får t-skjorten. </h2>
            <p>Trykk fullfør for å registrere kjøpet eller gå tilbake for å endre ting først.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
        </div>
    )
}

function TshirtPayment(props: TShirtStepProps) {
    const [payLater, setPayLater] = useState(false);
    const [loading, setLoading] = useState(false);

    function goBack() {
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function payWithVipps() {
        var reg = props.registration;
        reg.vipps = true;
        props.setRegistration(reg);
        next();
    }

    function next() { // NEEDS TO PUT 
        setLoading(true);
        sendTshirtRegistration(props.registration).then((success: string) => {
            if(success === "Done") {
                props.setCurrentStep(TShirtSteps.Done);
            }
            else {
                window.location.assign(success);
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }

    if(payLater) {
        return (
            <PayLater {... props} total={calculateTotal(props.registration.tshirts)} goBack={() => setPayLater(false)} />
        )
    }

    return (
        <div className="slideLeft">
            <p>Din handlekurv:</p>
            <div>
                {
                    props.registration?.tshirts.map((x, index) => {
                        return (
                            <TshirtItem tshirt={x} isFirst={index === 0} />  
                        )
                    })
                }
                <div className={styles.checkoutTotal}>
                    <span>Totalt:</span>
                    <span>{calculateTotal(props.registration.tshirts)}kr</span>
                </div>

            </div>
            <div className={styles.paymentButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>

                {
                    props.registration.tshirts.length > 1 &&
                    <React.Fragment>
                        <button className={styles.cashCard} onClick={() => {
                            setPayLater(true);
                            var reg = props.registration;
                            reg.vipps = false;
                            props.setRegistration(reg);
                        }}>Kort/Kontant</button>
                        <img src={Vippsbutton} onClick={payWithVipps}/>
                    </React.Fragment>
                }

                {
                    props.registration.tshirts.length === 1 &&
                    <React.Fragment>
                        <button className={styles.nextButton} onClick={() => {
                            var reg = props.registration;
                            reg.vipps = false;
                            props.setRegistration(reg);
                            next();
                        }}>Registrer</button>
                    </React.Fragment>
                }

            </div>
            <Loading loading={loading} />
        </div>
    )
}

export default TshirtPayment;
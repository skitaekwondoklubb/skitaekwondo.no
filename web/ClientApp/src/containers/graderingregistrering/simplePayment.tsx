import { useState } from "react";
import styles from '../registrering/registration.module.css';
import Vippsbutton from "../betalmedvipps.svg";
import Loading from '../loading/loading';
import { SimpleStepProps, SimpleSteps } from "../../models/simplesteps";
import { sendGraderingRegistration } from "../../services/graderingService";
import { GraderingType } from "../../models/registrationModels";
import { Navigate, useLocation } from "react-router-dom";

function Gradering(props: { firstName: string }) {
    return (
        <CheckoutRow article={`Gradering (${props.firstName})`} price={"350"}/>
    )
}


function CheckoutRow(props: { article: string, price: string }) {
    return (
        <div className={styles.checkout}>
            <span>{props.article}</span>
            <span>{props.price}kr</span>
        </div>
    )
}

interface ActualPaymentProps extends SimpleStepProps {
    total: number;
    goBack: () => void;
}

function PayLater(props: ActualPaymentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    function nextStep() {
        setLoading(true);
        sendGraderingRegistration(props.registration).then((success: string) => {
            if(success === "Done") {
                props.setCurrentStep(SimpleSteps.Done);
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
            <h2>Betaling med kort er på gradering.</h2>
            <p>Betaling med kort skjer når du registrer oppmøte på gradering.</p>
            <p>Trykk fullfør for å registrere deg til gradering eller gå tilbake for å endre ting først.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
        </div>
    )
}

function Payment(props: SimpleStepProps) {
    const [payLater, setPayLater] = useState(false);
    const [loading, setLoading] = useState(false);
    const total = 350;
    const location = useLocation();
    const registrationType = location.pathname.includes("gradering/barn") ? GraderingType.Children : GraderingType.Adults;

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
        sendGraderingRegistration(props.registration).then((success: string) => {
            if(success === "Done") {
                props.setCurrentStep(SimpleSteps.Done);
            }
            else {
                window.location.assign(success);
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }


    if(props.registration.type !== registrationType) {
        return (
            <Navigate to={ props.registration.type == GraderingType.Children ? "/gradering/barn" : "/gradering/ungdomvoksen" } />
        )
    }
    // if(payLater) {
    //     return (
    //         <PayLater {... props} total={total} goBack={() => setPayLater(false)} />
    //     )
    // }

    return (
        <div className="slideLeft">
            <p>Din registrering:</p>
            <div>
                <Gradering firstName={props.registration.firstName} />
               
                <div className={styles.checkoutTotal}>
                    <span>Totalt:</span>
                    <span>{total}kr</span>
                </div>
            </div>

            <p>Gradering skal betales i lokalene våre når dere ankommer gradering den {props.registration.type === GraderingType.Children ? "9. juni" : "11.juni"}</p>

            <div className={styles.paymentButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={() => {
                    setPayLater(true);
                    var reg = props.registration;
                    reg.vipps = false;
                    props.setRegistration(reg);
                    next();
                }}>Registrer</button>
                {/* <img src={Vippsbutton} onClick={payWithVipps}/> */}
            </div>
            <Loading loading={loading} />
        </div>
    )
}

export default Payment;
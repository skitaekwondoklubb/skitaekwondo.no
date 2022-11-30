import { useState } from "react";
import { SimpleStepProps, SimpleSteps } from "../../models/simplesteps";
import styles from '../registrering/registration.module.css';
import Vippsbutton from "../betalmedvipps.svg";
import Loading from '../loading/loading';
import { askForGraderingVippsPurchase } from "../../services/graderingService";
import { SimplePayLater } from "./simplePaymentLater";
//import Vippshurtigkasse from "./vipps_hurtigkasse.svg";

function CheckoutRow(props: { article: string, price: string }) {
    return (
        <div className={styles.checkout}>
            <span>{props.article}</span>
            <span>{props.price} kr</span>
        </div>
    )
}

function SimplePayment(props: SimpleStepProps) {
    const [loading, setLoading] = useState(false);
    const [payLater, setPayLater] = useState(false);

    function goBack() {
        props.setCurrentStep(SimpleSteps.Information);
    }

    async function payWithVipps() {
        setLoading(true);
        try {
            const ask = await askForGraderingVippsPurchase(props.registration);
            window.location.assign(ask);
        }
        catch {
            setLoading(false);
        }
    }

    if(payLater) {
        return (
            <SimplePayLater {... props} total={350} goBack={() => setPayLater(false)} />
        )
    }

    return (
        <div className="slideLeft">
            <p>Din registrering:</p>
            <div>
                <CheckoutRow article={`Gradering`} price={"350"}/>
                <div className={styles.checkoutTotal}>
                    <span>Totalt:</span>
                    <span>350 kr</span>
                </div>
            </div>
            <div className={styles.paymentButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.cashCard} onClick={() => {setPayLater(true)}}>Kort/Kontant</button>
                <img src={Vippsbutton} onClick={payWithVipps}/>
            </div>
            
            <Loading loading={loading} />
        </div>
    )
}

export default SimplePayment;
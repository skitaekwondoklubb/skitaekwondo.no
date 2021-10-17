import { useState } from "react";
import { StepProps, Steps } from "../../models/steps";
import { PizzaAlternatives } from "./pizzaform";
import styles from './registration.module.css';
import Vippsbutton from "../betalmedvipps.svg";
import Loading from '../loading/loading';
import { Registration } from "../../models/registrationModels";
import { Instructor } from "../../models/instructor";
import { askForVippsPurchase, sendVinterleirRegistration } from "../../services/vinterleirService";
//import Vippshurtigkasse from "./vipps_hurtigkasse.svg";

function Gradering(props: {gradering: boolean, dangradering: boolean }) {
    if(props.gradering && !props.dangradering ) {
        return (
            <CheckoutRow article={`Gradering`} price={"350"}/>
        )
    }
    return <div/>
}

function VinterleirForUtover(props: { firstName: string, lastName: string, age: number}) {
    if(props.age <= 12) {
        return <CheckoutRow article={`Vinterleir (barn): ${props.firstName} ${props.lastName}`} price={"825"}/>
    }
    
    return <CheckoutRow article={`Vinterleir (voksen): ${props.firstName} ${props.lastName}`} price={"975"}/>
}


function Pizza(props: {pizza: string }) {
    if(props.pizza !== PizzaAlternatives.None) {
        return (
            <CheckoutRow article={`Pizza`} price={"80"}/>
        )
    }
    return <div/>
}

function InstructorStatus(props: { instructor?: Instructor }) {
    if(props.instructor === Instructor.SkiFullTimeInstructor) {
        return <CheckoutRow article={`Hovedinstruktør ved Ski Taekwondo Klubb`} price={"-975"}/>
    }
    else if(props.instructor === Instructor.SkiHelperInstructor) {
        return <CheckoutRow article={`Hjelpeinstruktør ved Ski Taekwondo Klubb`} price={`-475`}/>
    }
    return <></>
}

function CheckoutRow(props: { article: string, price: string }) {
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
        sendVinterleirRegistration(props.registration).then((success: boolean) => {
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
            <h2>Betaling med kort er på vinterleiren.</h2>
            <p>Betaling med kort skjer når du registrer oppmøte på leieren.</p>
            <p>Trykk fullfør for å registrere deg til leieren eller gå tilbake for å endre ting først.</p>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={props.goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
        </div>
    )
}

function GetTotal(registration: Registration) {
    let total = 975;
    if(registration.age != null && registration.age <= 12) {
        total -= 150;
    }
    else if(registration.instructor === Instructor.SkiFullTimeInstructor) {
        total = 0;
    }
    else if(registration.instructor === Instructor.SkiHelperInstructor) { 
        total -= 475;
    }
    if(registration.gradering === true && registration.grade?.dan === false && registration.grade.grade !== 1) {
        total += 350;
    }

    for (const ledsager of (registration.ledsagere != null ? registration.ledsagere : [])) {
        if(ledsager.alreadyRegistered === false) {
            total += 500;
        }
    }

    return total;
}

function Payment(props: StepProps) {
    const [payLater, setPayLater] = useState(false);
    const total = GetTotal(props.registration);
    const [loading, setLoading] = useState(false);

    function goBack() {
        props.setCurrentStep(Steps.OtherInformation);
    }

    function next() {
        setLoading(true);
        sendVinterleirRegistration(props.registration).then((success: boolean) => {
            if(success) {
                props.setCurrentStep(Steps.Done);
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }

    async function payWithVipps() {
        setLoading(true);
        try {
            const ask = await askForVippsPurchase(props.registration);
            window.location.assign(ask);
        }
        catch {
            setLoading(false);
        }
    }

    if(payLater) {
        return (
            <PayLater {... props} total={total} goBack={() => setPayLater(false)} />
        )
    }

    return (
        <div className="slideLeft">
            <p>Din registrering:</p>
            <div>
                <VinterleirForUtover age={props.registration.age} firstName={props.registration.firstName} lastName={props.registration.lastName}/>
                <InstructorStatus instructor={props.registration.instructor}/>
                <Gradering 
                    gradering={props.registration.gradering != null && props.registration.gradering === true} 
                    dangradering={props.registration.grade != null && (props.registration.grade.dan === true 
                        || (props.registration.grade.dan === false && props.registration.grade.grade === 1))
                    }
                />
                {
                    props?.registration?.ledsagere ? props.registration.ledsagere.map((ledsager) => {
                        return (
                            <CheckoutRow article={`Ledsager: ${ledsager.firstName} ${ledsager.lastName}`} price={`${ledsager.alreadyRegistered ? 0 : 500}`}/>
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
                <button hidden={total === 0} className={styles.cashCard} onClick={() => {setPayLater(true)}}>Kort/Kontant</button>
                <img hidden={total === 0} src={Vippsbutton} onClick={payWithVipps}/>
                <button hidden={total !== 0} className={styles.nextButton} onClick={next}>Fullfør registrering</button>
            </div>
            <Loading loading={loading} />
        </div>
    )
}

export default Payment;
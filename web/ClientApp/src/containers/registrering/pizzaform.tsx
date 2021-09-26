import { useEffect, useState } from "react";
import styles from './registration.module.css';
import { StepProps } from "../../models/steps";

export enum PizzaAlternatives {
    None = 'Vil ikke ha pizza',
    PigStyle = 'Pig Style',
    OlaN = 'Ola N',
    ElPollo = 'El Pollo',
    Vegan = 'Vegansk pizza',
    Other = 'Annet: '
}

function Pizza(props: StepProps) {
    const [pizza, setPizza] = useState(props.registration.pizza?.startsWith(PizzaAlternatives.Other) ? PizzaAlternatives.Other : props.registration.pizza);
    const [pizzaOther, setPizzaOther] = useState("");

    useEffect(() => {
        
        if(props.registration.pizza?.startsWith(PizzaAlternatives.Other)) {
            setPizzaOther(props.registration.pizza?.replace("Annet: ", ""));
            console.log("Setting pizza to other...");
            setPizza(PizzaAlternatives.Other);
        }
    }, [])

    useEffect(() => {
        console.log("Pizza set: " + pizza)
    }, [])

    function save() {
        let registration = {... props.registration};
        if(pizza?.startsWith(PizzaAlternatives.Other)) {
            registration.pizza = pizza + pizzaOther;
        }
        else {
            registration.pizza = pizza;
        }

        props.setRegistration(registration);
    }

    function goBack() {
        save();
        if(typeof(props.prevStep) === "number") {
            props.setCurrentStep(props.prevStep);
        }
    }

    function nextStep() {
        save();
        if(typeof(props.nextStep) === "number") {
            props.setCurrentStep(props.nextStep);
        }
    }

    return (
        <div className="slideLeft">
            <p>Vi kommer til å bestille pizza på arrangementet. For å vite hvor mange pizzaer vi skal bestille vil vi vite om du skal spise med oss på arrangementet.</p>
            <p>Pizza koster 80,- ekstra.</p>
            <p>Dersom du ønsker pizza, men ikke ønsker å spisen noen av de nedenfor, skriv i annet feltet.</p>
            <p>Vil du ha pizza på arrangementet?</p>
            <div className={`${styles.largeSpan} ${styles.radioButtons}`}>
                <input type={"radio"} value={PizzaAlternatives.None} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Ønsker ikke pizza
                <input type={"radio"} value={PizzaAlternatives.PigStyle} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Skinke, salami, ost
                <input type={"radio"} value={PizzaAlternatives.OlaN} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Marinert biff, champignon, paprika, ost
                <input type={"radio"} value={PizzaAlternatives.ElPollo} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Bacon, kjøttboller, marinert kylling, jalapeños, ost
                <input type={"radio"} value={PizzaAlternatives.Vegan} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Vegansk alternativ
                <input type={"radio"} value={PizzaAlternatives.Other} name="pizza" onChange={(v) => setPizza(v.currentTarget.value)} /> Annen
            </div>
            <div hidden={!pizza?.startsWith(PizzaAlternatives.Other)}>
                <h3>Skriv hvorfor du ønsker en annen type pizza:</h3>
                <input className={styles.otherInput} disabled={!pizza?.startsWith(PizzaAlternatives.Other)}  value={pizzaOther} onChange={(v) => setPizzaOther(v.currentTarget.value)} />
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Pizza;
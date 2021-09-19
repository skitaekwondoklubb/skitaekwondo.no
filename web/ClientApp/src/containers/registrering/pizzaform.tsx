import { useState } from "react";
import styles from './registration.module.css';
import { StepProps } from "../../models/steps";

function Pizza(props: StepProps) {
    const [pizza, setPizza] = useState(props.registration.pizza);

    function save() {
        let registration = {... props.registration};
        registration.pizza = pizza;

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
            <p>Vil du ha pizza på arrangementet?</p>
            <div className={styles.registrationForm}>
                <div className={`${styles.largeSpan} ${styles.checkboxLine}`} onClick={() => setPizza(!pizza)}>
                    <input type={"checkbox"} checked={pizza} onChange={x => setPizza(x.currentTarget.checked)}/>
                    <span>Jeg ønsker pizza! 🍕</span>
                </div>
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Pizza;
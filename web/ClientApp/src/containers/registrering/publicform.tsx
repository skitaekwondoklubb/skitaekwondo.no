import { StepProps, Steps } from "../../models/steps";
import {  useState } from 'react';
import styles from './registration.module.css';
export function Public(props: StepProps) {
    const [accept, setAccept] = useState<boolean | null>(props.registration.public);

    function save() {
        let registration = {... props.registration};
        registration.public = accept;

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

    function setAcceptValue(v: string) {
        if(v === "") {
            setAccept(null);
        }
        else {
            const value = v === "true";
            setAccept(value);
        }
    }

    return (
        <div className="slideLeft">
            <p>Mange har vist interesse for å kunne se hvilke venner og klubbmedlemmer har meldt seg på.</p>
            <p>Det er også mange som setter pris på personvern og anonymitet. Dermed er dette ikke noe som gjøres uten direkte samtykke.</p>
            <p>Dersom man velger å vises til andre vil følgende informasjon være søkbar og offentlig:</p>
            <ul>
                <li>Fullt navn</li>
                <li>Grad</li>
            </ul>
            <p>Disse dataene slettes og blir ikke synlige etter vinterleir er fullført.</p>
            <p>Hvis man ønsker å ombestemme seg så ta kontakt med oss på kontakt@skitaekwondo.no for å endre valget.</p>

            <div className={styles.publicChoice}>
                <p><b>Velg hva slags synlighetsgrad du ønsker:</b></p>
                <select id={"publicSelectBox"} onChange={v => setAcceptValue(v.currentTarget.value)} value={`${accept}`}>
                    <option value={""}>-------</option>
                    <option value={"false"}>Jeg ønsker IKKE å være synlig for andre.</option>
                    <option value={"true"}>Jeg ønsker å ha mitt navn og min grad synlig for andre.</option>
                </select>
            </div>

            <div className={styles.navigationButtons}>
                <button className={styles.backButton} onClick={goBack}>Tilbake</button>
                <button className={styles.nextButton} disabled={accept == null} onClick={nextStep}>Neste</button>
            </div>
        </div>
    )
}

export default Public;
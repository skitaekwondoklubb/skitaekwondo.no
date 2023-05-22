import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { SimpleSteps, TShirtSteps } from "../../models/simplesteps";
import { TShirtRegistration } from "../../models/registrationModels";
import TshirtForm from "./tshirtregistrering";
import TshirtPayment from "./tshirtbetaling";
import Tshirt, { TshirtSaleDone } from "./tshirt";
import styles from '../registrering/registration.module.css';
import AddTShirt from "./tshirtChoice";

interface CurrentPropsProps {
    step: TShirtSteps;
    setCurrentStep: (step: TShirtSteps) => void, 
    registration: TShirtRegistration, 
    setRegistration: (reg: TShirtRegistration) => void; 
}

function TshirtRouting() {
    const [currentStep, setCurrentStep] = useState(TShirtSteps.Welcome);
    const [registration, setRegistration] = useState<TShirtRegistration>({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        age: 0,
        tshirts: [],
        vipps: false
    });

    const currentProps: CurrentPropsProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie("tshirt_registrering");
        const step = getCookie("tshirt_registrering_step");

        if(step != null && step !== '' && step !== "0" && registrationCookie != null && registrationCookie !== '') {
            try {
                setCurrentStep(Number.parseInt(step));
                setRegistration(JSON.parse(registrationCookie));
            }
            catch {
                deleteAllCookies();
            }
        }
    }, [])

    function setCurrentStepAndSaveCookie(step: TShirtSteps) {
        setCurrentStep(step);
        setCookie("tshirt_registrering_step", step, 3);
    }

    function setRegistrationAndSaveCookie(reg: TShirtRegistration) {
        setRegistration(reg);
        setCookie("tshirt_registrering", JSON.stringify(reg), 3);
    }

    return (
        <div className={styles.registrationCenter}>
            <div className={`${styles.registration} slideLeft`}>
                <div className={styles.textSide}>
                    <h1>Kjøp av t-skjorte</h1>
                    <RouteCurrentStep { ... currentProps }/>
                </div>
            </div>
        </div>

    )
}

function RouteCurrentStep(currentProps: CurrentPropsProps) {
    switch (currentProps.step) {
        case TShirtSteps.Information:
            return <TshirtForm {... currentProps } prevStep={TShirtSteps.Welcome} nextStep={TShirtSteps.Payment} />
        case TShirtSteps.AddTshirt:
            return <AddTShirt {... currentProps } prevStep={TShirtSteps.Information} nextStep={TShirtSteps.Information} />
        case TShirtSteps.Payment: 
            return <TshirtPayment {... currentProps } prevStep={TShirtSteps.Information} nextStep={TShirtSteps.Done} />
        case TShirtSteps.Done:
            return <TshirtSaleDone />
        default:
            return <Tshirt {... currentProps } prevStep={TShirtSteps.Welcome} nextStep={TShirtSteps.Information}/>;
    }
}

export default TshirtRouting;
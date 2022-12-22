import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { SimpleSteps } from "../../models/simplesteps";
import { SimpleRegistration } from "../../models/registrationModels";
import SimpleForm from "./simpleform";
import SimplePayment from "./simplePayment";
import SimpleGradering, { SimpleGraderingDone } from "./simplegradering";
import styles from '../registrering/registration.module.css';

interface CurrentPropsProps {
    step: SimpleSteps;
    setCurrentStep: (step: SimpleSteps) => void, 
    registration: SimpleRegistration, 
    setRegistration: (reg: SimpleRegistration) => void; 
}

function SimpleRegistrationRouting() {
    const [currentStep, setCurrentStep] = useState(SimpleSteps.Welcome);
    const [registration, setRegistration] = useState<SimpleRegistration>({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        age: 0,
        vipps: false
    });

    const currentProps: CurrentPropsProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie("simple_registrering");
        const step = getCookie("simple_registrering_step");

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

    function setCurrentStepAndSaveCookie(step: SimpleSteps) {
        setCurrentStep(step);
        setCookie("simple_registrering_step", step, 3);
    }

    function setRegistrationAndSaveCookie(reg: SimpleRegistration) {
        setRegistration(reg);
        setCookie("simple_registrering", JSON.stringify(reg), 3);
    }

    return (
        <div className={`${styles.registration} slideLeft`}>
            <h1>Registrering til gradering</h1>
            <RouteCurrentStep { ... currentProps }/>
        </div>
    )
}

function RouteCurrentStep(currentProps: CurrentPropsProps) {
    switch (currentProps.step) {
        case SimpleSteps.Information:
            return <SimpleForm {... currentProps } prevStep={SimpleSteps.Welcome} nextStep={SimpleSteps.Payment} />
        case SimpleSteps.Payment: 
            return <SimplePayment {... currentProps } prevStep={SimpleSteps.Information} nextStep={SimpleSteps.Done} />
        case SimpleSteps.Done:
            return <SimpleGraderingDone />
        default:
            return <SimpleGradering {... currentProps } prevStep={SimpleSteps.Welcome} nextStep={SimpleSteps.Information}/>;
    }
}

export default SimpleRegistrationRouting;
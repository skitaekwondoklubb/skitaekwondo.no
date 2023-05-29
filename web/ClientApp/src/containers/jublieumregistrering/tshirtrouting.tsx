import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { JubileumSteps } from "../../models/simplesteps";
import { JubileumRegistration } from "../../models/registrationModels";
import JubileumForm from "./jubileumregistrering";
import Jubileum, { JubileumDone } from "./jubileum";
import styles from '../registrering/registration.module.css';

interface CurrentPropsProps {
    step: JubileumSteps;
    setCurrentStep: (step: JubileumSteps) => void, 
    registration: JubileumRegistration, 
    setRegistration: (reg: JubileumRegistration) => void; 
}

function JublieumRouting() {
    const [currentStep, setCurrentStep] = useState(JubileumSteps.Welcome);
    const [registration, setRegistration] = useState<JubileumRegistration>({
        firstName: "",
        lastName: "",
        adult: 0,
        child: 0
    });

    const currentProps: CurrentPropsProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie("jubileum_registrering");
        const step = getCookie("jubileum_registrering_step");

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

    function setCurrentStepAndSaveCookie(step: JubileumSteps) {
        setCurrentStep(step);
        setCookie("jubileum_registrering_step", step, 3);
    }

    function setRegistrationAndSaveCookie(reg: JubileumRegistration) {
        setRegistration(reg);
        setCookie("jubileum_registrering", JSON.stringify(reg), 3);
    }

    return (
        <div className={styles.registrationCenter}>
            <div className={`${styles.registration} slideLeft`}>
                <div className={styles.textSide}>
                    <h1>Registrering til 45-års jubileuum</h1>
                    <RouteCurrentStep { ... currentProps }/>
                </div>
            </div>
        </div>

    )
}

function RouteCurrentStep(currentProps: CurrentPropsProps) {
    switch (currentProps.step) {
        case JubileumSteps.Registration:
            return <JubileumForm {... currentProps } prevStep={JubileumSteps.Welcome} nextStep={JubileumSteps.Done} />
        case JubileumSteps.Done:
            return <JubileumDone />
        default:
            return <Jubileum {... currentProps } prevStep={JubileumSteps.Welcome} nextStep={JubileumSteps.Registration}/>;
    }
}

export default JublieumRouting;
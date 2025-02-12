import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { SimpleSteps, SkoleSteps } from "../../models/simplesteps";
import { GraderingType, SimpleRegistration, SkoleRegistration } from "../../models/registrationModels";
import styles from '../registrering/registration.module.css';
import Skole, { SkoleDone } from "./skole";
import SkoleRegister from "./skoleregistrering";
import SkoleParentRegistration from "./skoleparentregistration";
import SkoleDaysStep from "./skoledaysregistration";
import SkoleReceiptStep from "./skoleReceipt";

interface CurrentPropsProps {
    step: SkoleSteps;
    setCurrentStep: (step: SkoleSteps) => void, 
    registration: SkoleRegistration, 
    setRegistration: (reg: SkoleRegistration) => void; 
}

function SkoleRouting() {
    const [currentStep, setCurrentStep] = useState(SkoleSteps.Welcome);
    const [registration, setRegistration] = useState<SkoleRegistration>({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        age: 10,
        firstDay: false,
        secondDay: false,
        thirdDay: false,
        parentFirstName: "",
        parentLastName: "",
        isMember: false
    });

    const currentProps: CurrentPropsProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie(`skole_registrering`);
        const step = getCookie(`skole_registrering_step`);

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

    function setCurrentStepAndSaveCookie(step: SkoleSteps) {
        setCurrentStep(step);
        setCookie(`skole_registrering_step`, step, 3);
    }

    function setRegistrationAndSaveCookie(reg: SkoleRegistration) {
        setRegistration(reg);
        setCookie(`skole_registrering`, JSON.stringify(reg), 3);
    }

    return (
        <div className={styles.registrationCenter}>
            <div className={`${styles.registration} slideLeft`}>
                <div className={styles.textSide}>
                    <h1>Registrering til sommerskole</h1>
                    <RouteCurrentStep { ... currentProps }/>
                </div>
            </div>
        </div>

    )
}

function RouteCurrentStep(currentProps: CurrentPropsProps) {
    switch (currentProps.step) {
        case SkoleSteps.Registration: 
            return <SkoleRegister {... currentProps } prevStep={SkoleSteps.Welcome} nextStep={SkoleSteps.Done} />
        case SkoleSteps.Parent: 
            return <SkoleParentRegistration {... currentProps } prevStep={SkoleSteps.Registration} nextStep={SkoleSteps.Days} />
        case SkoleSteps.Days: 
            return <SkoleDaysStep {... currentProps } prevStep={SkoleSteps.Parent} nextStep={SkoleSteps.Done} />
        case SkoleSteps.Receipt: 
            return <SkoleReceiptStep {... currentProps } prevStep={SkoleSteps.Days} nextStep={SkoleSteps.Done} />
        case SkoleSteps.Done:
            return <SkoleDone />
        default:
            return <Skole {... currentProps } prevStep={SkoleSteps.Welcome} nextStep={SkoleSteps.Registration} />
    }
}

export default SkoleRouting;
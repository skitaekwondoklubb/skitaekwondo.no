import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { NewMemberStepProps, NewMemberSteps } from "../../models/simplesteps";
import { NewMemberRegistration, RefererType, } from "../../models/registrationModels";
import styles from '../registrering/registration.module.css';
import NewMember, { NewMemberDone } from "./newmember";
import NewMemberReceiptStep from "./newmemberReceipt";
import NewMemberParentRegistration from "./newmemberparentregistration";
import NewMemberRegister from "./newmemberregistrrering";
import { useSearchParams } from "react-router-dom";

function NewMemberRouting() {
    const [referer, setReferer] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(NewMemberSteps.Welcome);
    const [registration, setRegistration] = useState<NewMemberRegistration>({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        age: 12,
        parentFirstName: "",
        parentLastName: "",
        referer: getReferer()
    });

    const currentProps: NewMemberStepProps = { 
        step: currentStep,
        prevStep: currentStep,
        nextStep: NewMemberSteps.Registration,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie(`newmember_registrering`);
        const step = getCookie(`newmember_registrering_step`);

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

    function getReferer() {
        switch (referer.get("referer")) {
            case "qr":
                return RefererType.QRCode;
            case "email":
                return RefererType.Email;
            default:
                return RefererType.Website;
        }
    }

    function setCurrentStepAndSaveCookie(step: NewMemberSteps) {
        setCurrentStep(step);
        setCookie(`newmember_registrering_step`, step, 3);
    }

    function setRegistrationAndSaveCookie(reg: NewMemberRegistration) {
        setRegistration(reg);
        setCookie(`newmember_registrering`, JSON.stringify(reg), 3);
    }

    return (
        <div className={styles.registrationCenter}>
            <div className={`${styles.registration} slideLeft`}>
                <div className={styles.textSide}>
                    <h1>Registrering</h1>
                    <RouteSteps { ... currentProps }/>
                </div>
            </div>
        </div>

    )
}

function RouteSteps(currentProps: NewMemberStepProps) {
    console.log(currentProps.registration);
    switch (currentProps.step) {
        case NewMemberSteps.Registration: 
            return <NewMemberRegister {... currentProps } prevStep={NewMemberSteps.Welcome} nextStep={NewMemberSteps.Done} />
        case NewMemberSteps.Parent: 
            return <NewMemberParentRegistration {... currentProps } prevStep={NewMemberSteps.Registration} nextStep={NewMemberSteps.Receipt} />
        case NewMemberSteps.Receipt: 
            return <NewMemberReceiptStep {... currentProps } prevStep={NewMemberSteps.Parent} nextStep={NewMemberSteps.Done} />
        case NewMemberSteps.Done:
            return <NewMemberDone />
        default:
            return <NewMember {... currentProps } prevStep={NewMemberSteps.Welcome} nextStep={NewMemberSteps.Registration} />
    }
}

export default NewMemberRouting;
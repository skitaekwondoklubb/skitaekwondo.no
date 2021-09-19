import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { Registration } from "../../models/registrationModels";
import { Steps } from "../../models/steps";
import NameAgeForm from "./agenameform";
import Allergies from "./allergiesform";
import EmailTelephone from "./emailtelephoneform";
import FoodPreference from "./foodpreferenceform";
import OtherInformation from "./otherinformationform";
import Pizza from "./pizzaform";
import { Done, RegistrationStep, Welcome } from "./registrering";

function RegistrationRouting() {
    const [currentStep, setCurrentStep] = useState(Steps.Welcome);
    const [registration, setRegistration] = useState<Registration>({
        firstName: "",
        lastName: "",
        age: 18,
        email: "",
        telephone: "",
        allergies: "",
        otherInfo: "",
        vegan: false
    });
    const currentProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

    useEffect(() => {
        const registrationCookie = getCookie("registrering");
        const step = getCookie("registrering_step");

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

    function setCurrentStepAndSaveCookie(step: Steps) {
        setCurrentStep(step);
        setCookie("registrering_step", step, 3);
    }

    function setRegistrationAndSaveCookie(reg: Registration) {
        setRegistration(reg);
        setCookie("registrering", JSON.stringify(reg), 3);
    }

    switch (currentStep) {
        case Steps.NameAge:
            return <NameAgeForm {... currentProps } prevStep={Steps.Welcome} nextStep={Steps.EmailTelephone} 
                />
        case Steps.EmailTelephone:
            return <EmailTelephone {... currentProps } prevStep={Steps.NameAge} nextStep={Steps.Allergies}
                />
        case Steps.Allergies:
            return <Allergies {... currentProps } prevStep={Steps.EmailTelephone} nextStep={Steps.Pizza}
                />
        case Steps.Pizza:
            return <Pizza {... currentProps } prevStep={Steps.Allergies} nextStep={Steps.FoodPreference}/>
        case Steps.FoodPreference:
            return <FoodPreference {... currentProps } prevStep={Steps.Pizza} nextStep={Steps.OtherInformation}
                />
        case Steps.OtherInformation:
            return <OtherInformation {... currentProps } prevStep={Steps.FoodPreference} nextStep={Steps.Check}
                />
        case Steps.Check: 
            return <RegistrationStep {... currentProps } prevStep={Steps.OtherInformation} nextStep={Steps.Done} />
        case Steps.Done:
            return <Done />
        default:
            return <Welcome {... currentProps } prevStep={Steps.Welcome} nextStep={Steps.NameAge}/>;
    }
}

export default RegistrationRouting;
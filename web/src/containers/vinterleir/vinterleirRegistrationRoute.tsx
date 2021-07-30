import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { Registration } from "../../services/vinterleirService";
import NameAgeForm from "./agenameform";
import Allergies from "./allergiesform";
import ClubGrade from "./clubgradeform";
import EmailTelephone from "./emailtelephoneform";
import FoodPreference from "./foodpreferenceform";
import AddLedsager from "./ledsageraddform";
import Ledsager from "./ledsagerform";
import LedsagerManagement from "./ledsagermanagement";
import OtherInformation from "./otherinformationform";
import Payment from "./payment";
import { Done, Welcome } from "./registrering";
import Sleepover from "./sleepoverform";


function RegistrationRouting() {
    const [currentStep, setCurrentStep] = useState(Steps.Welcome);
    const [registration, setRegistration] = useState<Registration>({
        firstName: "",
        lastName: "",
        age: 18,
        email: "",
        telephone: "",
        allergies: "",
        club: "",
        grade: null,
        gradering: false,
        hasLedsager: false,
        ledsagere: [],
        otherInfo: "",
        sleepover: false,
        vegan: false
    });

    useEffect(() => {
        const registrationCookie = getCookie("vinterleir_registrering");
        const step = getCookie("vinterleir_registrering_step");

        if(step != null && step != '' && step != "0" && registrationCookie != null && registrationCookie != '') {
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
        setCookie("vinterleir_registrering_step", step, 3);
    }

    function setRegistrationAndSaveCookie(reg: Registration) {
        setRegistration(reg);
        setCookie("vinterleir_registrering", JSON.stringify(reg), 3);
    }

    switch (currentStep) {
        // case Steps.Welcome:
        //     return <Welcome step={currentStep} setCurrentStep={setCurrentStep} registration={registration} setRegistration={setRegistration}/>;
        case Steps.NameAge:
            return <NameAgeForm step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.EmailTelephone:
            return <EmailTelephone step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.ClubGrade:
            return <ClubGrade step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.Sleepover:
            return <Sleepover step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.Ledsager:
            return <Ledsager step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.LedsagerAdd:
            return <AddLedsager step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.LedsagerManagement:
            return <LedsagerManagement step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.Allergies:
            return <Allergies step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.FoodPreference:
            return <FoodPreference step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.OtherInformation:
            return <OtherInformation step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>
        case Steps.Payment:
            return <Payment step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie} />
        case Steps.Done:
            return <Done />
        default:
            return <Welcome step={currentStep} setCurrentStep={setCurrentStepAndSaveCookie} registration={registration} setRegistration={setRegistrationAndSaveCookie}/>;
    }
}

export interface StepProps {
    step: Steps;
    setCurrentStep: (step: Steps) => void;
    registration: Registration;
    setRegistration: (reg: Registration) => void;
}

export enum Steps {
    Welcome,
    NameAge,
    EmailTelephone,
    ClubGrade,
    Sleepover, 
    Ledsager,
    LedsagerAdd,
    LedsagerManagement,
    Allergies,
    FoodPreference,
    OtherInformation,
    Payment,
    Done
}

export default RegistrationRouting;
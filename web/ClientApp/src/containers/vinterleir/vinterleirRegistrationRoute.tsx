import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie, setCookie } from "../../services/cookieService";
import { Steps } from "../../models/steps";
import NameAgeForm from "../registrering/agenameform";
import Allergies from "../registrering/allergiesform";
import ClubGrade from "../registrering/clubgradeform";
import EmailTelephone from "../registrering/emailtelephoneform";
import FoodPreference from "../registrering/foodpreferenceform";
import AddLedsager from "../registrering/ledsageraddform";
import Ledsager from "../registrering/ledsagerform";
import Gradering from "../registrering/graderingform";
import LedsagerManagement from "../registrering/ledsagermanagement";
import OtherInformation from "../registrering/otherinformationform";
import Payment from "../registrering/payment";
import { Done, Welcome } from "./vinterleirregistrering";
import Sleepover from "../registrering/sleepoverform";
import { Registration } from "../../models/registrationModels";


function RegistrationRouting() {
    const [currentStep, setCurrentStep] = useState(Steps.Welcome);
    const [registration, setRegistration] = useState<Registration>({
        firstName: "",
        lastName: "",
        age: 0,
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
    const currentProps = { 
        step: currentStep,
        setCurrentStep: setCurrentStepAndSaveCookie, 
        registration: registration, 
        setRegistration: setRegistrationAndSaveCookie 
    };

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
            return <NameAgeForm {... currentProps } prevStep={Steps.Welcome} nextStep={Steps.EmailTelephone} 
                />
        case Steps.EmailTelephone:
            return <EmailTelephone {... currentProps } prevStep={Steps.NameAge} nextStep={Steps.ClubGrade}
                />
        case Steps.ClubGrade:
            return <ClubGrade {... currentProps} prevStep={Steps.EmailTelephone} nextStep={Steps.Gradering}
                />
        case Steps.Gradering:
            return <Gradering {... currentProps} prevStep={Steps.ClubGrade} nextStep={Steps.Sleepover}
                />
        case Steps.Sleepover:
            return <Sleepover {... currentProps } prevStep={Steps.Gradering} nextStep={Steps.Ledsager}
                />
        case Steps.Ledsager:
            return <Ledsager {... currentProps } prevStep={Steps.Sleepover} nextStep={[Steps.LedsagerManagement, Steps.Allergies]}
                />
        case Steps.LedsagerAdd:
            return <AddLedsager {... currentProps } prevStep={Steps.LedsagerManagement} nextStep={Steps.LedsagerManagement}
                />
        case Steps.LedsagerManagement:
            return <LedsagerManagement {... currentProps } prevStep={Steps.Ledsager} nextStep={[Steps.LedsagerAdd, Steps.Allergies]}
                />
        case Steps.Allergies:
            return <Allergies {... currentProps } prevStep={[Steps.Ledsager, Steps.LedsagerManagement]} nextStep={Steps.FoodPreference}
                />
        case Steps.FoodPreference:
            return <FoodPreference {... currentProps } prevStep={Steps.Allergies} nextStep={Steps.OtherInformation}
                />
        case Steps.OtherInformation:
            return <OtherInformation {... currentProps } prevStep={Steps.FoodPreference} nextStep={Steps.Payment}
                />
        case Steps.Payment:
            return <Payment {... currentProps } prevStep={Steps.OtherInformation} nextStep={Steps.Done} 
                />
        case Steps.Done:
            return <Done />
        default:
            return <Welcome {... currentProps } prevStep={Steps.Welcome} nextStep={Steps.NameAge}/>;
    }
}


export default RegistrationRouting;
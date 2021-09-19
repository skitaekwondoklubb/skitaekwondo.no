import { Registration } from './registrationModels';

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
    Pizza,
    OtherInformation,
    Payment,
    Check,
    Done
}

export interface StepProps {
    step: Steps;
    setCurrentStep: (step: Steps) => void;
    prevStep: Steps | Steps[];
    nextStep: Steps | Steps[];
    registration: Registration;
    setRegistration: (reg: Registration) => void;
}
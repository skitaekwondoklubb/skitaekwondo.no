import { SimpleRegistration, TShirtRegistration } from './registrationModels';

export enum SimpleSteps {
    Welcome,
    Information,
    Payment,
    Check,
    Vipps,
    Done
}

export enum TShirtSteps {
    Welcome,
    Information,
    AddTshirt,
    Payment,
    Check,
    Vipps,
    Done
}


export interface SimpleStepProps {
    step: SimpleSteps;
    setCurrentStep: (step: SimpleSteps) => void;
    prevStep: SimpleSteps;
    nextStep: SimpleSteps;
    registration: SimpleRegistration;
    setRegistration: (reg: SimpleRegistration) => void;
}

export interface TShirtStepProps {
    step: TShirtSteps;
    setCurrentStep: (step: TShirtSteps) => void;
    prevStep: TShirtSteps;
    nextStep: TShirtSteps;
    registration: TShirtRegistration;
    setRegistration: (reg: TShirtRegistration) => void;
}
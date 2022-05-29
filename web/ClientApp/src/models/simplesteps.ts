import { SimpleRegistration } from './registrationModels';

export enum SimpleSteps {
    Welcome,
    Information,
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
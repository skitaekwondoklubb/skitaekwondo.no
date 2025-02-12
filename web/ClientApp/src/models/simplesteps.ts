import { JubileumRegistration, NewMemberRegistration, SimpleRegistration, SkoleRegistration, TShirtRegistration } from './registrationModels';

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

export enum JubileumSteps {
    Welcome,
    Registration,
    Done
}

export enum SkoleSteps {
    Welcome,
    Registration,
    Parent,
    Days,
    Receipt,
    Done
}

export enum NewMemberSteps {
    Welcome,
    Registration,
    Parent,
    Receipt,
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

export interface JubileumStepProps {
    step: JubileumSteps;
    setCurrentStep: (step: JubileumSteps) => void;
    prevStep: JubileumSteps;
    nextStep: JubileumSteps;
    registration: JubileumRegistration;
    setRegistration: (reg: JubileumRegistration) => void;
}

export interface SkoleStepProps {
    step: SkoleSteps;
    setCurrentStep: (step: SkoleSteps) => void;
    prevStep: SkoleSteps;
    nextStep: SkoleSteps;
    registration: SkoleRegistration;
    setRegistration: (reg: SkoleRegistration) => void;
}

export interface NewMemberStepProps {
    step: NewMemberSteps;
    setCurrentStep: (step: NewMemberSteps) => void;
    prevStep: NewMemberSteps;
    nextStep: NewMemberSteps;
    registration: NewMemberRegistration;
    setRegistration: (reg: NewMemberRegistration) => void;
}
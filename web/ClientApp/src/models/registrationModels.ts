import { Instructor } from './instructor';
export interface Registration {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    telephone: string;
    allergies: string;
    vegan: boolean;
    otherInfo: string;
    club?: string;
    grade?: Grade | null;
    gradering?: boolean;
    instructor?: Instructor;
    sleepover?: boolean;
    hasLedsager?: boolean;
    ledsagere?: Array<Ledsager>;
    pizza?: string;
    theory?: boolean;
    physical?: boolean;
}

export interface Ledsager {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    telephone: string;
    email: string;
    sleepover: boolean;
    alreadyRegistered: boolean;
}

export interface Grade {
    grade: number;
    dan: boolean;
    color: string;
    name: string;
}

export interface SimpleRegistration {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}
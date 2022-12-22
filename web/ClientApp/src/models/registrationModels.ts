
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
    clubId: number;
    gradeId: number;
    gradering: boolean;
    instructor: Instructor;
    sleepover: boolean;
    hasLedsager: boolean;
    ledsagere: Array<Ledsager>;
    wantsToInstruct: boolean;
    vipps: boolean;
    public: boolean | null;
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

export interface SimpleRegistration {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    telephone: string;
    vipps: boolean;
}
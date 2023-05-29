
import { Instructor } from './instructor';
import { TShirt } from './tshirtsizes';
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

export interface TShirtRegistration {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    telephone: string;
    tshirts: TShirt[];
    vipps: boolean;
}

export interface JubileumRegistration {
    firstName: string;
    lastName: string;
    adult: number;
    child: number;
}
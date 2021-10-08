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
    sleepover?: boolean;
    hasLedsager?: boolean;
    ledsagere?: Array<Ledsager>;
    pizza?: string;
    theory?: boolean;
    physical?: boolean;
}

export interface Ledsager {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    telephone: string;
    email: string;
    sleepover: boolean;
    alreadyRegistred: boolean;
}

export interface Grade {
    grade: number;
    dan: boolean;
    color: string;
    name: string;
}



export enum ShowTypes {
    All,
    Children,
    Grown
}

export interface AgendaHappening {
    who: AgendaGrade[];
    what: string;
    where: string;
    when?: string;
    type: ShowTypes;
    class: string;
}

export interface AgendaRowData {
    when: string;
    happenings: AgendaHappening[];
}

export interface AgendaGrade {
    nr: number;
    dan: boolean;
    color: string;
}


export const hvitt: AgendaGrade = { nr: 10, dan: false, color: "Hvitt" };
export const gulstrip: AgendaGrade = { nr: 9, dan: false, color: "Hvitt med gul stripe" };
export const hvitstripe: AgendaGrade = { nr: 8.1, dan: false, color: "Gult med hvit stripe" };
export const gult: AgendaGrade = { nr: 8, dan: false, color: "Gult" };
export const gronnstripe: AgendaGrade = { nr: 7.1, dan: false, color: "Gult med grønn stripe" };
export const gront: AgendaGrade = { nr: 7, dan: false, color: "Grønt" };
export const blastripe: AgendaGrade = { nr: 6.1, dan: false, color: "Grønt med blå stripe" };
export const bla: AgendaGrade = { nr: 6, dan: false, color: "Blått" };
export const rodtynnstripe: AgendaGrade = { nr: 5.1, dan: false, color: "Blått med en tynn rød stripe" };
export const rodstripe: AgendaGrade = { nr: 5, dan: false, color: "Blått med en rød stripe" };
export const rodt: AgendaGrade = { nr: 4, dan: false, color: "Rødt" };
export const sortstripe: AgendaGrade = { nr: 3, dan: false, color: "Rødt med en sort stripe" };
export const tosorte: AgendaGrade = { nr: 2, dan: false, color: "Rødt med to sorte striper" };
export const tresorte: AgendaGrade = { nr: 1, dan: false, color: "Rødt med tre sorte striper" };
export const dan: AgendaGrade = { nr: 1, dan: true, color: "1. Dan" };
export const andredan: AgendaGrade = { nr: 2, dan: true, color: "2. Dan eller høyere" };

export const gradeColors: AgendaGrade[] = [
    hvitt,
    gulstrip,
    hvitstripe,
    gult,
    gronnstripe,
    gront,
    blastripe,
    bla,
    rodtynnstripe,
    rodstripe,
    rodt,
    sortstripe,
    tosorte,
    tresorte,
    dan,
    andredan,
]


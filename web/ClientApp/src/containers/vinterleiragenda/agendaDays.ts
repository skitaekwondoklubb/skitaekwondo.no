import { AgendaRowData, andredan, dan, ShowTypes, tresorte, gult, bla, blastripe, gront, gronnstripe, rodtynnstripe, rodstripe, rodt, sortstripe, tosorte, hvitt, gulstrip, hvitstripe } from "./agendaData";

export interface AgendaDay {
    day: number;
    rows: AgendaRowData[];
}


export let fredag: AgendaDay = {
    day: 1,
    rows: [
        {
            when: "18.00 - 19.00",
            happenings: [
                {
                    what: "Registrering",
                    who: [ ],
                    where: "Kiosk",
                    class: "boxpurple",
                    type: ShowTypes.All

                }
            ]
        },
        {
            when: "19.15",
            happenings: [
                {
                    what: "Oppstilling",
                    who: [  ],
                    where: "Sal 1",
                    class: "boxpurple",
                    type: ShowTypes.All

                }
            ]
        },
        {
            when: "19.30 - ",
            happenings: [
                {
                    what: "Fellestrening",
                    who: [  ],
                    where: "Sal 1",
                    class: "boxpurple",
                    when: "Frem til 20.30",
                    type: ShowTypes.All
                    
                },
                {
                    what: "Dangradering",
                    who: [ tresorte, dan, andredan ],
                    where: "Sal 2",
                    class: "boxblack",
                    when: "Frem til ukjent tidspunkt",
                    type: ShowTypes.Grown
                }
            ]
        },
        {
            when: "20.30 -",
            happenings: [
                {
                    what: "Kveldsmat",
                    who: [ ],
                    where: "Salen",
                    class: "boxpurple",
                    type: ShowTypes.All
                }
            ]
        }
    ]
}

export let lordag: AgendaDay = {
    day: 2,
    rows: [
        {
            when: "08.00 - 09.00",
            happenings: [
                {
                    what: "Frokost",
                    who: [ ],
                    where: "Kiosk",
                    class: "boxpurple",
                    type: ShowTypes.All

                }
            ]
        },
        {
            when: "09.45 - 10.45",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.Children,
                    who: [ gult, gronnstripe, gront, blastripe, bla ],
                    where: "Sal 1",
                    class: "boxyellow",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ bla, rodtynnstripe, rodstripe ],
                    where: "Sal 2",
                    class: "boxblue",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ rodt, sortstripe, tosorte  ],
                    where: "Sal 3",
                    class: "boxred",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ andredan ],
                    where: "Sal 4",
                    class: "boxblack",
                },
            ]
        },
        {
            when: "11.00 - 12.00",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.Children,
                    who: [ hvitt, gulstrip, hvitstripe  ],
                    where: "Sal 1",
                    class: "",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ hvitt, gulstrip, hvitstripe, gult, gronnstripe, gront  ],
                    where: "Sal 2",
                    class: "boxgreen",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ tresorte, dan ],
                    where: "Sal 4",
                    class: "boxaltred",
                },
            ]
        },
        {
            when: "12.00 - 14.00",
            happenings: [
                {
                    what: "Lunsj",
                    who: [  ],
                    type: ShowTypes.All,
                    where: "Kiosk",
                    when: "Frem til 14.00",
                    class: "boxpurple",
                },
            ]
        },
        {
            when: "13.00 - 13.30",
            happenings: [
                {
                    what: "Fellesbilde",
                    who: [  ],
                    type: ShowTypes.All,
                    where: "Sal 1",
                    class: "boxpurple",
                },
            ]
        },
        {
            when: "12.45 - 13.45",
            happenings: [
                {
                    what: "Trening",
                    who: [ gult, gronnstripe, gront, blastripe, bla ],
                    type: ShowTypes.All,
                    where: "Sal 1",
                    class: "boxyellow",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ bla, rodtynnstripe, rodstripe ],
                    where: "Sal 2",
                    class: "boxblue",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ rodt, sortstripe, tosorte  ],
                    where: "Sal 3",
                    class: "boxred",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ andredan ],
                    where: "Sal 4",
                    class: "boxblack",
                },
            ]
        },
        {
            when: "14.00 - 15.00",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.Children,
                    who: [ hvitt, gulstrip, hvitstripe  ],
                    where: "Sal 1",
                    class: "",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ hvitt, gulstrip, hvitstripe, gult, gronnstripe, gront  ],
                    where: "Sal 2",
                    class: "boxgreen",
                },

                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ tresorte, dan ],
                    where: "Sal 4",
                    class: "boxaltred",
                },
            ]
        },
        {
            when: "15.15 - 16.15",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.Children,
                    who: [ gult, gronnstripe, gront, blastripe, bla ],
                    where: "Sal 1",
                    class: "boxyellow",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ bla, rodtynnstripe, rodstripe ],
                    where: "Sal 2",
                    class: "boxblue",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ rodt, sortstripe, tosorte  ],
                    where: "Sal 3",
                    class: "boxred",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ andredan ],
                    where: "Sal 4",
                    class: "boxblack",
                },
            ]
        },
        {
            when: "16.30 - 17.30",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.Children,
                    who: [ hvitt, gulstrip, hvitstripe  ],
                    where: "Sal 1",
                    class: "",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ hvitt, gulstrip, hvitstripe, gult, gronnstripe, gront  ],
                    where: "Sal 2",
                    class: "boxgreen",
                },
                {
                    what: "Trening",
                    type: ShowTypes.Grown,
                    who: [ tresorte, dan ],
                    where: "Sal 4",
                    class: "boxaltred",
                },
            ]
        },
        {
            when: "18.00 - 18.45",
            happenings: [
                {
                    what: "Kamp / Oppvisning",
                    type: ShowTypes.All,
                    who: [  ],
                    where: "Sal 1",
                    class: "boxpurple",
                },
            ]
        },
        {
            when: "19.00 - ",
            happenings: [
                {
                    type: ShowTypes.All,
                    what: "Middag",
                    who: [  ],
                    where: "Kiosk",
                    class: "boxpurple",
                },
            ]
        },
    ]
}

export let sondag: AgendaDay = {
    day: 3,
    rows: [
        {
            when: "08.00 - 09.30",
            happenings: [
                {
                    what: "Frokost og Rydding",
                    type: ShowTypes.All,
                    who: [  ],
                    where: "Kiosk/Soveplasser",
                    class: "boxpurple",
                }
            ]
        },
        {
            when: "09.30 - 10.30",
            happenings: [
                {
                    what: "Trening",
                    type: ShowTypes.All,
                    who: [  ],
                    where: "Sal 1",
                    class: "boxpurple",
                }
            ]
        },
        {
            when: "11.00 - 16.00",
            happenings: [
                {
                    what: "Cupgradering Ski",
                    type: ShowTypes.Children,
                    who: [ hvitt, gulstrip, hvitstripe, gult, gronnstripe, gront, blastripe, bla, rodtynnstripe, rodstripe, rodt, sortstripe ],
                    where: "Sal 1",
                    class: "boxpurple",
                },
                {
                    what: "Dan-sermoni",
                    type: ShowTypes.Grown,
                    who: [ dan, andredan ],
                    where: "Sal 2",
                    class: "boxblack",
                    when: "Frem til 12.00"
                }
            ]
        },
        {
            when: "11.30 -",
            happenings: [
                {
                    what: "Lunsj",
                    type: ShowTypes.All,
                    who: [  ],
                    where: "Kiosk",
                    class: "boxpurple",
                }
            ]
        },
        {
            when: "12.00 - 16.00",
            happenings: [
                {
                    what: "Kamptrening v. Kristian Borgen",
                    type: ShowTypes.Grown,
                    who: [  ],
                    where: "Sal 2",
                    class: "boxpurple",
                }
            ]
        }
    ]
}
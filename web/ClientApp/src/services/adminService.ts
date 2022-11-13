import sha256 from 'crypto-js/sha256'
import { deleteCookie, getCookie, setCookie } from './cookieService';

export async function GetAdminCookie(user: string, pw: string) {
    const hashedpw = sha256(pw).toString();

    const response = await fetch(`/api/VinterleirAdmin/GetToken/${user}/${hashedpw}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json'
        },
    }).catch((err) => {
        deleteCookie("adminToken");
        throw new Error(err);
    })

    const cookie = await response.text();

    if((await cookie).startsWith("{")) {
        throw Error("Unauthroized");
    }

    setCookie("adminToken", cookie, 1);
    return true;
}

export interface VinterleirFullUser {
    personid: number;
    firstname: string;
    lastname: string;
    club: string;
    grade: string;
    age: number;
    telephone: string;
    email: string;
    gradering: boolean;
    sleepover: boolean;
    vegan: boolean;
    isLedsager: boolean;
    isLedsagerForName: string;
    allergies: string;
    instructor: string;
    wantstoinstruct: boolean;
    otherinfo: string;
    public: boolean;
    amount: number;
    paid: boolean;
    vipps: boolean;
    orderid: string;
    transactionid: string;
}

export async function getAllFullVinterleirUsers(): Promise<VinterleirFullUser[]> {
    const cookie = getCookie("adminToken");

    if(cookie == null || cookie === "") {
        throw Error("Not authorized");
    }

    try {
        const response = await fetch(`/api/VinterleirAdmin/Get/${cookie}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch((err) => {
            throw new Error(err);
        })

        return response.json();
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}


export async function getAllFullVinterleirUsersCSV() {
    const cookie = getCookie("adminToken");

    if(cookie == null || cookie === "") {
        throw Error("Not authorized");
    }

    try {
        await fetch(`/api/VinterleirAdmin/GetCsv/${cookie}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( res => res.blob())
        .then( blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "deltakere.csv";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again     
        })
        
        .catch((err) => {
            throw new Error(err);
        })
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}
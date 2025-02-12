import sha256 from 'crypto-js/sha256'
import { deleteCookie, getCookie, setCookie } from './cookieService';
import { RefererType } from '../models/registrationModels';

export async function GetAdminCookie(pw: string) {
    const hashedpw = sha256(pw).toString();

    const response = await fetch(`/api/NewMemberAdmin/GetToken/${hashedpw}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json'
        },
    }).catch((err) => {
        deleteCookie("newMemberToken");
        throw new Error(err);
    })

    const cookie = await response.text();

    if((await cookie).startsWith("{")) {
        throw Error("Unauthroized");
    }

    setCookie("newMemberToken", cookie, 150);
    return true;
}

export interface NewMemberDataUser {
    registrationId: number;
    firstname: string;
    lastname: string;
    age: number;
    telephone: string;
    email: string;
    parentfirstname: string;
    parentlastname: string;
    registrationdate: Date;
    referer: string;
}

export async function GetAllNewMembers(): Promise<NewMemberDataUser[]> {
    const cookie = getCookie("newMemberToken");

    if(cookie == null || cookie === "") {
        throw Error("Not authorized");
    }

    try {
        const response = await fetch(`/api/NewMemberAdmin/Get/${cookie}`, {
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

export async function removeNewMember(user: NewMemberDataUser) {
    const cookie = getCookie("newMemberToken");

    if(cookie == null || cookie === "") {
        throw Error("Not authorized");
    }

    try {
        const response = await fetch(`/api/NewMemberAdmin/Remove/${user.registrationId}/${cookie}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch((err) => {
            throw new Error(err);
        })

        return response.ok;
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}



export async function getAllNewMembersCSV() {
    const cookie = getCookie("newMemberToken");

    if(cookie == null || cookie === "") {
        throw Error("Not authorized");
    }

    try {
        await fetch(`/api/NewMemberAdmin/GetCsv/${cookie}`, {
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
            a.download = "nyemedlemmer.csv";
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
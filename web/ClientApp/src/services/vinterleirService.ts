import { Grade, Registration, SimpleRegistration } from '../models/registrationModels';

export async function sendVinterleirRegistration(reg: Registration): Promise<boolean> {
    try {
        const response = await fetch(`/api/Vinterleir/Post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reg)
        }).catch((err) => {
            throw new Error(err);
        })

        return response.json();
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}

export async function askForVinterleirVippsPurchase(reg: Registration): Promise<string> {
    try {
        const response = await fetch(`/api/Vipps/BetalVinterleirMedVipps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reg)
        }).catch((err) => {
            throw new Error(err);
        })

        const resp = response.text();
        
        return resp;
    }
    catch(err) {
        throw new Error(err as string);
    }
}

export async function checkIfPaid(orderId: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/Vipps/CheckIfVippsOk/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            throw new Error(err);
        })
        
        return response.json();
    }
    catch(err) {
        throw new Error(err as string);
    }
}

export async function cancelOrder(orderId: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/Vipps/Cancel/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            throw new Error(err);
        })

        return response.json();
    }
    catch(err) {
        throw new Error(err as string);
    }
}

export function getGrades() {
    const colors = [
        "Hvitt","Hvitt med gul stripe","Gult med hvit stripe",
        "Gult","Gult med gr??nn stripe",
        "Gr??nt","Gr??nt med bl?? stripe",
        "Bl??tt","Bl??tt med en tynn r??d stripe","Bl??tt med en r??d stripe",
        "R??dt","R??dt med en sort stripe","R??dt med to sorte striper","R??dt med tre sorte striper"
    ];

    let list: Grade[] = [];
    let current: number = 10;
    for (const color of colors) {
        list.push({
            grade: current,
            dan: false,
            color: color,
            name: `${current}. Cup (${color})`
        })

        if(current === 10) {
            current = 9; // Special grade... 
        }
        else if(current > 5 && Number.isInteger(current)) {
            current = (current-1) + 0.1;
        }
        else if(current > 5 && !Number.isInteger(current)){
            current = current - 0.1;
        }
        else {
            current = current - 1;
        }
    }

    for (let index = 1; index < 11; index++) {
        list.push({
            grade: index,
            dan: true,
            color: "Svart",
            name: `${index}. Dan`
        });
    }

    return list;
}
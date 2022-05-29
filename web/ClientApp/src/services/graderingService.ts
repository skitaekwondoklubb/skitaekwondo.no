import { SimpleRegistration } from '../models/registrationModels';

export async function sendGraderingRegistration(reg: SimpleRegistration): Promise<boolean> {
    try {
        const response = await fetch(`/api/Gradering/Post`, {
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

export async function askForGraderingVippsPurchase(reg: SimpleRegistration): Promise<string> {
    try {
        const response = await fetch(`/api/GraderingVipps/BetalGraderingMedVipps`, {
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
        const response = await fetch(`/api/GraderingVipps/CheckIfVippsOk/${orderId}`, {
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
        const response = await fetch(`/api/GraderingVipps/Cancel/${orderId}`, {
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

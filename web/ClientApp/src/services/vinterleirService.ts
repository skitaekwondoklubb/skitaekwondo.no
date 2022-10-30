import { Registration } from '../models/registrationModels';
import { Grade } from './gradeService';

export async function sendVinterleirRegistration(reg: Registration): Promise<string> {
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

        return response.text();
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}

export enum OrderStatus {
    Nothing = "",
    Cancelled = "CANCELLED",
    Reserved = "RESERVED",
    Reserve_Failed = "RESERVE_FAILED",
    Rejected = "REJECTED"
}

export async function checkIfPaid(orderId: string): Promise<OrderStatus> {
    try {
        const response = await fetch(`/api/Vipps/CheckIfVippsOk/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            throw new Error(err);
        })
        
        var stringResponse: string = await response.text();
        switch (stringResponse) {
            case OrderStatus.Cancelled:
                return OrderStatus.Cancelled;
            case OrderStatus.Rejected:
                return OrderStatus.Rejected;
            case OrderStatus.Reserve_Failed:
                return OrderStatus.Reserve_Failed;
            case OrderStatus.Reserved:
                return OrderStatus.Reserved;
            default:
                return OrderStatus.Nothing;
        }
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

export interface VinterleirUser {
    name: string;
    grade: string;
    club: string;
}

export async function getVinterleirUsers(): Promise<VinterleirUser[]> {
    try {
        const response = await fetch(`/api/VinterleirUsers/Get`, {
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

export interface VinterleirGradeStatistic {
    grade: Grade;
    amount: number;
}
export async function getVinterleirGradeStatistic(): Promise<VinterleirGradeStatistic[]> {
    try {
        const response = await fetch(`/api/VinterleirUsers/GetGrades`, {
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
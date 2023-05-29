import { JubileumRegistration } from '../models/registrationModels';

export async function sendJubileumRegistration(reg: JubileumRegistration): Promise<string> {
    try {
        const response = await fetch(`/api/Jubileum/Post`, {
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
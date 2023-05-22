import { TShirtRegistration } from '../models/registrationModels';

export async function sendTshirtRegistration(reg: TShirtRegistration): Promise<string> {
    try {
        const response = await fetch(`/api/Other/Post`, {
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
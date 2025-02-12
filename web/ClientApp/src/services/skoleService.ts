import { SkoleRegistration } from '../models/registrationModels';

export async function sendSkoleRegistration(reg: SkoleRegistration): Promise<string> {
    try {
        const response = await fetch(`/api/Skole/Post`, {
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
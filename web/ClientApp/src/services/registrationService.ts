import { Registration } from '../models/registrationModels';

export async function sendRegistration(reg: Registration): Promise<boolean> {
    try {
        const response = await fetch(`/api/Registrering/Post`, {
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
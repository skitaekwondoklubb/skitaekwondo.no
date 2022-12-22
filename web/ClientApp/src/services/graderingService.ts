import { SimpleRegistration } from '../models/registrationModels';

export async function sendGraderingRegistration(reg: SimpleRegistration): Promise<string> {
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

        return response.text();
    }
    catch(err) {
        throw new Error(`${err}`);
    }
}
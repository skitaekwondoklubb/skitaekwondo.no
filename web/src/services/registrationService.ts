import { Registration } from '../models/registrationModels';

export async function sendRegistration(reg: Registration) {
    // Default options are marked with *
    const response = await fetch(`${process.env.PUBLIC_URL}api/Registrering/Post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reg)
    });

    return response.json();
}
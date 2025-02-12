import { NewMemberRegistration } from '../models/registrationModels';

export async function sendNewMemberRegistration(reg: NewMemberRegistration): Promise<string> {
    try {
        const response = await fetch(`/api/NewMember/Post`, {
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
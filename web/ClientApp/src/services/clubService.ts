export interface Club {
    clubId: number;
    name: string;
}


export async function getClubs(): Promise<Club[]> {
    try {
        const response = await fetch(`/api/Club/Get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch((err) => {
            throw new Error(err);
        })

        return response?.json();
    }
    catch(err) {
        throw new Error(err as string);
    }
}
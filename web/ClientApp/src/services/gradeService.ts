

export interface Grade {
    gradeId: number;
    grade: number;
    isDan: boolean;
    name: string;
}

export async function getGrades(): Promise<Grade[]> {
    try {
        const response = await fetch(`/api/Grade/Get`, {
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
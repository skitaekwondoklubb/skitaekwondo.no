import { Grade } from '../models/registrationModels';

export function getGrades() {
    const colors = [
        "Hvitt","Hvitt med gul stripe","Gult med hvit stripe",
        "Gult","Gult med grønn stripe",
        "Grønt","Grønt med blå stripe",
        "Blått","Blått med en tynn rød stripe","Blått med en rød stripe",
        "Rødt","Rødt med en sort stripe","Rødt med to sorte striper","Rødt med tre sorte striper"
    ];

    let list: Grade[] = [];
    let current: number = 10;
    for (const color of colors) {
        list.push({
            grade: current,
            dan: false,
            color: color,
            name: `${current}. Cup (${color})`
        })

        if(current == 10) {
            current = 9; // Special grade... 
        }
        else if(current > 5 && Number.isInteger(current)) {
            current = (current-1) + 0.1;
        }
        else if(current > 5 && !Number.isInteger(current)){
            current = current - 0.1;
        }
        else {
            current = current - 1;
        }
    }

    for (let index = 1; index < 11; index++) {
        list.push({
            grade: index,
            dan: true,
            color: "Svart",
            name: `${index}. Dan`
        });
    }

    return list;
}

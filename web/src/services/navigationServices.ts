import { Destination } from "../navigation/destinations";


export function getHeaderbarNavigation(): Promise<Destination[]> {
    return fetch('/destinations.json')
    .then(response => response.json())
    .then((data: { destinations: Destination[] }) => {
        return data.destinations;
    })
    .catch((e) => {
        // TODO: Add proper catching.
        console.log("Det skjedde en feil!");
        console.log(e);
        return [];
    });
}
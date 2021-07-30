# Ski Taekwondo Klubb
Dette er Ski Taekwondo Klubb sin nettside. Den er laget for å vise statisk informasjon om klubben og for registrering av medlemskap eller til vinterleir.

## Prosjekter
Dette er de forskjellige prosjektene vår nettside består av:

### Api
Apiet er veldig simpelt C# ASP.NET web api og tar imot data som sendes til et Excel skjema. 

### Data
Et klassebibliotek for å gjøre det ovenfor. Det er splittet ut i et klassebibliotek for å gjøre det lettere å teste.

### Test
Unit og integrasjonstester for excelhåndtering.

### Web
En React nettside som inneholder det meste.

## Dependencies:
- .NET 5
- Node

## Bygging:
Bygging av prosjektet er veldig lett. For både Api, data og test er det bare å kjøre 
```bash
dotnet build
```
fra Api eller test mappen så vil den fikse seg selv.

For å bygge webprosjektet må du først bruke
```bash
npm install
```
i web mappen. Deretter kan du kjøre 
```bash
npm build
```

## Utvikling:
Det er et VS Code workspace med som kan brukes. Ellers er det bare 
```bash
dotnet watch run # Api
npm start        # Web
```

## Docker:
Det er to Docker containers som brukes for å host prosjektene:
### Api
Api prosjektet kjører i denne containeren. Den må ha visse hemmelige environment variables for å kunne logge inn og endre Excel skjemaet.

### Web
Frontend prosjektet kjører i en egen container og kan kalle Api containeren for å sende data.

## Gjenstående arbeid:
Det gjenstår en del arbeid.

- Stock bilder skal byttes ut med bilder av våre utøvere.
- Apiet er ikke ferdig og må sikres.
- GitHub Actions for automatisk bygging
- Automatisk deployment til Azure 

## Kontakt:
For videre info kan man kontakte oss! Vår epost står på nettsiden.
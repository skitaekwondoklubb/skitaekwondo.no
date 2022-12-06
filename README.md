# Ski Taekwondo Klubb
Dette er Ski Taekwondo Klubb sin nettside. Den er laget for å vise statisk informasjon om klubben og for registrering av medlemskap eller til vinterleir.

## Gjenstående arbeid:
Det gjenstår en del arbeid.

- Mye CSS må sammenslås og renses. For mye copy paste
- Generell cleanup.
- GitHub Actions for automatisk bygging
- Automatisk deployment til Azure 

## Prosjekter
Dette er de forskjellige prosjektene vår nettside består av:

### Api
Apiet er veldig simpelt C# ASP.NET web api og tar imot data som sendes en PostgreSQL database (i Azure).

### Data
Et klassebibliotek for å gjøre det ovenfor. Det er splittet ut i et klassebibliotek for å gjøre det lettere å teste.

### Test
Integrasjonstester for excelhåndtering.

### Web
En React nettside som inneholder det meste.

## Dependencies:
- .NET 7
- Node
- PostgreSQL (for api)

## Bygging:
Bygging av prosjektet er veldig lett. For både Api, data og test er det bare å kjøre 
```bash
dotnet build
```
fra Api, Web eller test mappen så vil den fikse seg selv. Husk dependencies må være installert.

## Utvikling:
Det er et VS Code workspace med som kan brukes.
```bash
dotnet watch run # i api og/eller web
```

## Docker:
Det er to Docker containers som brukes for å host prosjektene:
### Api
Api prosjektet kjører i denne containeren. Den må ha visse environment variables for å kunne bruke Vipps, PostgreSQL og lignende.
Se appsettings.json for hvilke environment variables denne må ha.

### Web
Frontend prosjektet kjører i en egen container og kan kalle Api containeren for å sende data.

## Kontakt:
For videre info kan man kontakte oss! Vår epost står på nettsiden.

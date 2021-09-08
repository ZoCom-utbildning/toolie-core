# toolie

## Arkitektur

- Toolie
    - GroupPersistance
        - Create
            - LocalStorage
        - Read
        - Update
        - Delete
    - Apps
        - Groupie
            - input
                - slumpa en gruppledare
                - kickass gruppnamn
                - gruppStrategi ( mem/grupp, antal grupper )
                - Hamna ej i samma grupp
            - output
                - slumpa namn inom grupp
                - flytta gruppmedlemmar mellan grupper
                - Ta bort medlemmar
                - UI hjälp - såhär funkar det
                - Skapa tomma grupper
                - Blanda grupper
                - Tvärgrupper
                - Screenshot
                - Ev spara grupper på annat sätt?
        - Selfie
            - input
                - exkludera draget namn
                - visa dragna namn
                - templates
                    - slot machine
                    - drop from above
                    - outline animation ( anime.js )
                    - spinning wheel ( anime? )
                    - surprise me
            - output
                - visa dragna namn
                - fjärrkontroll ( via ex. mobilen )           
        - Helpie
        - Attendie
            - checkIn
            - checkOut

## Installera som NPM-modul i ett annat projekt
För att installera som en npm-modul behöver du en personal access token vilket du kan skapa genom att gå in på **din profil** > **Preferences** > **Access Tokens**. Skriv in sedan ett namn för din token och som scope ska du välja **api**. Kopiera din token till en textfil för du kommer inte komma åt den igen.

Öppna upp din terminal och skriv in följande kommandon.

```javascript
echo @internal-projects:registry=https://code.zocom.io/api/v4/packages/npm/ >> ~/.npmrc

npm config set @internal-projects:registry https://code.zocom.io/api/v4/projects/161/packages/npm/

// Här ska du ersätta `"<your_token>"` med din token du skapade tidigare.

npm config set -- '//code.zocom.io/api/v4/projects/161/packages/npm/:_authToken' "<your_token>"

// Till sist installera toolie-core som en npm-modul i ditt projekt.

npm i @internal-projects/toolie-core
```

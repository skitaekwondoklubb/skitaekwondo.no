using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

public static class Emails {
    public static string Oppstartsmail(NewMemberRegistrationEntity registration) { 
        
        var style = "<style type='text/css' > P {margin-top:0;margin-bottom:0;} </style>";
                
        var parent = registration.Person.age < 18  ? "" : $"<p>Foresatts navn: {registration.parentfirstname} {registration.parentlastname}</p>";

        var mail = @$"<html>
            <head>
                <meta http-equiv='Content-Type' content='text/html; charset=Windows-1252'>
                {style}
            </head>
            <body dir='ltr'>

                <p>Hei,</p>
                
                <br/>

                <p>Tusen takk for din interesse i Ski Taekwondo Klubb.</p>
                <p>Vi vil ta kontakt med dere på denne e-posten i fremtiden for ytterligere informasjon.</p>

                <br/>

                <p>Navn: {registration.Person.firstname} {registration.Person.lastname}</p>
                <p>Alder: {registration.Person.age} år</p>
                <p>E-post: {registration.Person.email}</p>
                <p>Telefon: {registration.Person.telephone}</p>
                {parent}

                <br/>

                <p>Ta gjerne kontakt med oss på <a href='mailto:kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a> hvis du lurer på noe.</p>
                
                <p><b>Denne e-posten kan <u>ikke</u> besvares.</b></p>

                <p>Med vennlig hilsen</p>
                <p>Ski Taekwondo Klubb</p> 
            </body>
        </html>
        ";

        return mail;
    }

    public static string Oppstartsmail_Plaintext(NewMemberRegistrationEntity registration) { 
        var parent = registration.Person.age < 18 ? "" : $"Foresatts navn: {registration.parentfirstname} {registration.parentlastname}";
        var mail = @$"Hei,

        Tusen takk for din interesse i Ski Taekwondo Klubb.
        Vi vil ta kontakt med dere på denne e-posten i fremtiden for ytterligere informasjon.

        Navn: {registration.Person.firstname} {registration.Person.lastname}
        Alder: {registration.Person.age} år
        E-post: {registration.Person.email}
        Telefon: {registration.Person.telephone}
        Referert fra: {Utilities.GetReferer(registration.referer)}
        {parent}

        Skulle dere ha spørsmål er det bare til å ta kontakt med oss på kontakt@skitaekwondo.no
        
        Denne e-posten kan ikke besvares.
        
        Med vennlig hilsen
        Ski Taekwondo Klubb";
        return mail;
    }
}
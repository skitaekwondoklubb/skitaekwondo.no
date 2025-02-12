using System.Collections.Generic;
using Azure.Communication.Email;
using SkiTKD.Data.Entities;

namespace SkiTKD.Data.Interfaces
{
    public interface IMailRepository
    {
        bool SendMail(RegistrationEntity registration);
        bool SendMail(List<EmailAddress> mailTo, EmailContent email);
    }
}
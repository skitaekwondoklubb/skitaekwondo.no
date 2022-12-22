using SkiTKD.Data.Entities;

namespace SkiTKD.Data.Interfaces
{
    public interface IMailRepository
    {
        bool SendMail(RegistrationEntity registration);
    }
}
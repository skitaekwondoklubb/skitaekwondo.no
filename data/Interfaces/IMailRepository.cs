namespace SkiTKD.Data.Interfaces
{
    public interface IMailRepository
    {
        bool SendMail(int registrationId);
    }
}
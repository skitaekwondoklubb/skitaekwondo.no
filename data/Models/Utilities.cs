namespace SkiTKD.Data.Models;

public static class Utilities {
    public static string GetReferer(RefererType type) {
        switch (type)
        {
            case RefererType.QRCode:
                return "QR Kode";
            case RefererType.Email:
                return "E-post";
            default:
                return "Nettside";
        }
    }
}
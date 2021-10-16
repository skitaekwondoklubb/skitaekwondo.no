
using System.Collections.Generic;

namespace SkiTKD.Data.Models {
    public class RawExcelModel { 
        public RawExcelRow[] value;
    }

    public class RawExcelRow {
        public int index;
        public string[][] values;
    }

    public class ExcelModel {
        public ExcelModel(RawExcelRow[] values) {
            People = new List<ExcelRow>();
            foreach (var item in values)
            {
                People.Add(new ExcelRow(item.index, item.values[0]));
            }
        }
        public List<ExcelRow> People;
    }

    public class ExcelRow {
        public ExcelRow(int index, string[] values) {
            Index = index;
            FirstName = values[0];
            LastName = values[1];
            Age = values[2];
            Telephone = values[3];
            Email = values[4];
            Club = values[5];
            Grade = values[6];
            Instructor = values[7];
            Gradering = values[8];
            Sleepover = values[9];
            Vegan = values[10];
            HasLedsager = values[11];
            Ledsagere = values[12];
            Allergies = values[13];
            OtherInfo = values[14];
            PaymentType = values[15];
            VippsOrderId = values[16];
            HasPaid = values[17];
        }

        public int Index { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string Club { get; set; }
        public string Grade { get; set; }
        public string Instructor { get; set; }
        public string Gradering { get; set; }
        public string Sleepover { get; set; }
        public string Vegan { get; set; }
        public string HasLedsager { get; set; }
        public string Ledsagere { get; set; }
        public string Allergies { get; set; }
        public string OtherInfo { get; set; }
        public string PaymentType { get; set; }
        public string VippsOrderId { get; set; }
        public string HasPaid { get; set; }

        public string[] ConvertToExcel() {
            string[] data = { 
                FirstName, LastName, Age,
                Telephone, Email, 
                Club, Grade,
                Instructor, Gradering,
                Sleepover, Vegan,
                HasLedsager, Ledsagere,
                Allergies, OtherInfo,
                PaymentType, VippsOrderId, HasPaid
            };

            return data;
        }
    }
}
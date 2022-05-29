
using System.Collections.Generic;

namespace SkiTKD.Data.Models {
    public class RawGraderingExcelModel { 
        public RawGraderingExcelRow[] value;
    }

    public class RawGraderingExcelRow {
        public int index;
        public string[][] values;
    }

    public class ExcelGraderingModel {
        public ExcelGraderingModel(RawGraderingExcelRow[] values) {
            People = new List<GraderingExcelRow>();
            foreach (var item in values)
            {
                People.Add(new GraderingExcelRow(item.index, item.values[0]));
            }
        }
        public List<GraderingExcelRow> People;
    }

    public class GraderingExcelRow {
        public GraderingExcelRow(int index, string[] values) {
            Index = index;
            FirstName = values[0];
            LastName = values[1];
            Telephone = values[2];
            Email = values[3];
            PaymentType = values[4];
            VippsOrderId = values[5];
            HasPaid = values[6];
            Total = values[7];
        }

        public int Index { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string PaymentType { get; set; }
        public string VippsOrderId { get; set; }
        public string HasPaid { get; set; }
        public string Total { get; set; }

        public string[] ConvertToExcel() {
            string[] data = { 
                FirstName, LastName,
                Telephone, Email,
                PaymentType, VippsOrderId, HasPaid,
                Total
            };

            return data;
        }
    }
}
export enum TShirtSizesCommon {
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL",
}

export enum TShirtSizesMan {
    XXXL = "XXXL"
}

export enum TShirtSizesChildren {
    TwoToThree = "2-3",
    FourToSix = "4-6",
    EightToTen = "8-10",
    TwelveToFourteen = "12-14"
}

export enum TShirtModel {
    Man = "Mann",
    Woman = "Dame",
    Child = "Barn"
}

export interface TShirt {
    model: TShirtModel;
    size: TShirtSizesCommon | TShirtSizesMan | TShirtSizesChildren;
}
/**
 * Model interface for iRacing driver data
 */
export interface Driver {
    CarIdx: number;
    UserName: string;
    AbbrevName: string;
    Initials: string;
    UserID: number;
    TeamID: number;
    TeamName: string;
    CarNumber: string;
    CarNumberRaw: number;
    CarPath: string;
    CarClassID: number;
    CarID: number;
    CarIsPaceCar: number;
    CarIsAI: number;
    CarScreenName: string;
    CarScreenNameShort: string;
    CarClassShortName?: any;
    CarClassRelSpeed: number;
    CarClassLicenseLevel: number;
    CarClassMaxFuelPct: string;
    CarClassWeightPenalty: string;
    CarClassPowerAdjust: string;
    CarClassDryTireSetLimit: string;
    CarClassColor: number;
    CarClassEstLapTime: number;
    IRating: number;
    LicLevel: number;
    LicSubLevel: number;
    LicString: string;
    LicColor: string;
    IsSpectator: number;
    CarDesignStr: string;
    HelmetDesignStr: string;
    SuitDesignStr: string;
    CarNumberDesignStr: string;
    CarSponsor_1: number;
    CarSponsor_2: number;
    CurDriverIncidentCount: number;
    TeamIncidentCount: number;
}

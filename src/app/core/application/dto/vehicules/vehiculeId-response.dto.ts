export interface IResponseIDVehicule {
    statusCode: number;
    message:    string;
    data:       IVehiculeID;
}

export interface IVehiculeID {
    id:           number;
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        string;
}

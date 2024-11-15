export interface IResponseVehicules {
    statusCode: number;
    message:    string;
    data:       IVehicule[];
    metadata:   Metadata;
}

export interface IVehicule{
    id:           number;
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        null | string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}

export interface IPostResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        null;
    id:           number;
}


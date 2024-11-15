export interface IResponseMaintenance {
    statusCode: number;
    message:    string;
    data:       IMaintenance[];
    metadata:   Metadata;
}

export interface IMaintenance {
    id:      number;
    type:    string;
    date:    string;
    mileage: number;
    notes:   string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}

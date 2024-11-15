import { IResponseVehicules } from "@/app/core/application/dto";
import { HttpClient } from "../utils/http-client";
import { IResponseMaintenance } from "@/app/core/application/dto/maintenance/maintenance-response.dto";

export class MaintenanceService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    // Obtiene una lista de vehículos paginada
    async findAll(page: number, size: number): Promise<IResponseVehicules> {
        try {
            const response = await this.httpClient.get<IResponseVehicules>(`vehicles?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.error("Error al obtener los vehículos:", error);
            throw error;
        }
    }

    // Obtiene los datos de mantenimiento asociados a un vehículo por su ID
    async findAllId(id: number, page: number, size: number): Promise<IResponseMaintenance> {
        try {
            const response = await fetch(`/api/vehicule/findAll/${id}?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const error = await response.json();
                console.error("Error al obtener los datos del API Route:", error);
                throw new Error(error.error || "Error al obtener el mantenimiento del vehículo.");
            }
    
            const data: IResponseMaintenance = await response.json();
            return data;
        } catch (error) {
            console.error("Error en la solicitud hacia el API Route:", error);
            throw error;
        }
    }
    

    // // Elimina un vehículo por su ID
    // async destroy(id: number): Promise<void> {
    //     try {
    //         const response = await this.httpClient.delete<void>(`vehicles/${id}`);
    //         if (!response) {
    //             throw new Error("No se pudo eliminar el vehículo");
    //         }
    //     } catch (error) {
    //         console.error("Error al eliminar el vehículo:", error);
    //         throw error;
    //     }
    // }

    // // Crea un nuevo vehículo (puedes agregar más propiedades a `service` según tu API)
    // async create(service: Partial<IResponseIDVehicule>): Promise<IResponseIDVehicule> {
    //     try {
    //         const response = await this.httpClient.post<IResponseIDVehicule>(`vehicles`, service);
    //         return response;
    //     } catch (error) {
    //         console.error("Error al crear el vehículo:", error);
    //         throw error;
    //     }
    // }

    // // Actualiza un vehículo existente por su ID
    // async save(service: Partial<IResponseIDVehicule>, id: number): Promise<IResponseIDVehicule> {
    //     try {
    //         const response = await this.httpClient.patch<IResponseIDVehicule>(`vehicles/${id}`, service);
    //         return response;
    //     } catch (error) {
    //         console.error("Error al actualizar el vehículo:", error);
    //         throw error;
    //     }
    // }
}

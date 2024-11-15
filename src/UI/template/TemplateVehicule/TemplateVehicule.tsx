import {  IResponseMaintenance } from '@/app/core/application/dto/maintenance/maintenance-response.dto';
import Pagination from '@/UI/molecules/Pagination/Pagination';
import TableMaintenance from '@/UI/organims/tableMantienence/tableMantienence';
import VehicleDetail from '@/UI/organims/vehicule/vehiculeView';
import React, { useEffect, useState } from 'react';

interface TemplateProps {
    id: number;
}

export default function TemplateVehicule({ id}: TemplateProps) {
    const [maintenanceResponse, setMaintenanceResponse] = useState<IResponseMaintenance | null>(null); 
    const [vehicleError, setVehicleError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMaintenanceData = async () => {
            try {
                const response = await fetch(`/api/vehicule/findAll/${id}`);
                if (!response.ok) throw new Error("No se pudo cargar la información del mantenimiento");

                const data: IResponseMaintenance = await response.json(); // Tipar correctamente la respuesta de la API
                setMaintenanceResponse(data); // Asignar directamente el objeto completo
            } catch (error) {
                console.error("Error al cargar los datos de mantenimiento:", error);
                setVehicleError("Error al cargar los datos de mantenimiento.");
            }
        };

        fetchMaintenanceData();
    }, [id]);

    return (
        <div>
            <VehicleDetail id={id} />
            
            {maintenanceResponse ? (
                maintenanceResponse.data.length > 0 ? (
                    <>
                        <TableMaintenance data={maintenanceResponse.data} />
                    </>
                ) : (
                    <p>No se encontraron datos de mantenimiento.</p>
                )
            ) : vehicleError ? (
                <p>{vehicleError}</p>
            ) : (
                <p>Cargando datos de mantenimiento...</p>
            )}
    
            {maintenanceResponse && <Pagination data={maintenanceResponse} />}
        </div>
    );
    
    
}

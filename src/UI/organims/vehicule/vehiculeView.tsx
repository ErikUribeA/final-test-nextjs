'use client'

import { IVehiculeID } from '@/app/core/application/dto/vehicules/vehiculeId-response.dto';
import { Button } from '@mui/joy';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface VehicleDetailProps {
    id: number
}

const VehicleDetail = ({ id }: VehicleDetailProps) => {
    const [vehicle, setVehicle] = useState<IVehiculeID | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`/api/vehicules/findAllId/${id}`);
                if (!response.ok) throw new Error("No se pudo cargar la información del vehículo");
                const data = await response.json();
                setVehicle(data.data);
            } catch (error) {
                console.error("Error al cargar el vehículo:", error);
            }
        };

        fetchVehicle();
    }, [id]);

    if (!vehicle) {
        return <p>Cargando datos del vehículo...</p>;
    }

    return (
        <div className="w-[90%] mx-auto max-w-screen-lg">
            <div className="flex justify-between w-full p-8 bg-white rounded-lg shadow-md">
                <div className='flex '>
                    <div className="m-7">
                        <Image
                            width={400}
                            height={400}
                            src={vehicle.photo || '/images/car.png'}
                            alt="Foto del vehículo"
                            className="object-cover"
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <p><strong>Año:</strong> {vehicle.year}</p>
                        <p><strong>Marca:</strong> {vehicle.make}</p>
                        <p><strong>Modelo:</strong> {vehicle.model}</p>
                        <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
                    </div>
                </div>
                <div>
                    <Button className='p-2 bg-green-500'>
                        Descargar Reporte
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;

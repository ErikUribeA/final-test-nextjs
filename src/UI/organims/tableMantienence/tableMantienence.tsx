'use client'
import './styles/style.sass';
import './styles/table.sass';

import { IMaintenance } from '@/app/core/application/dto/maintenance/maintenance-response.dto';

interface TableProps {
    data: IMaintenance[];
}

export default function TableMaintenance({ data }: TableProps) {

    return (
        <div className="m-5 bg-white flex flex-col gap-8 rounded-md shadow-lg">
            <div className="px-8 pt-6">
                <h2 className="font-bold text-[1.4em]">Lista de Vehículos</h2>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="hidden md:table-header-group">
                        <tr className="border-b-[1px] border-gray-200 text-gray-400">
                            <th className="Th">Fecha</th>
                            <th className="Th">Tipo</th>
                            <th className="Th">Kilometraje</th>
                            <th className="Th">Notas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((vehicule, index) => (
                            <tr
                                key={vehicule.id || index}
                                className="block md:table-row border-b-[1px] border-gray-200 p-4"
                            >
                                <td className="Td" data-label="Fecha">{vehicule.date}</td>
                                <td className="Td" data-label="Tipo">{vehicule.type}</td>
                                <td className="Td" data-label="Kilometraje">{vehicule.mileage}</td>
                                <td className="Td" data-label="Notas">{vehicule.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensaje cuando no hay resultados */}
            {data.length === 0 &&  (
                <div className="text-center py-4 text-gray-500">
                    No se encontraron vehículos que coincidan con la búsqueda
                </div>
            )}
        </div>
    );
}

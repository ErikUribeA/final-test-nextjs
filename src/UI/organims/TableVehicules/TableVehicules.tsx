'use client'
import { IVehicule } from '@/app/core/application/dto';
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import './styles/table.sass';
import Image from 'next/image';
import './styles/style.sass';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface TableProps {
    data: IVehicule[];
    // onEdit: (id: number, data: IVehicule[]) => void;
    onDelete: (id: number) => void;
}

interface ApiResponse {
    data: IVehicule[];
    metadata: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
    };
}

export default function TableVehicules({ data, onDelete}: TableProps) {
    const [filteredData, setFilteredData] = useState<IVehicule[]>(data);
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter()

    // Estado para los filtros individuales
    const [filters, setFilters] = useState({
        licensePlate: '',
        year: '',
        make: '',
        model: '',
    });

    // Sincronizar datos iniciales
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    // Función para manejar cambios en los campos de filtro
    const handleFilterChange = (field: string, value: string) => {
        setFilters({
            ...filters,
            [field]: value,
        });
    };

    // Función para aplicar filtros
    const applyFilters = async () => {
        setIsSearching(true);
        const allData: IVehicule[] = [];
        let currentPage = 1;
        let totalPages = 1;

        try {
            do {
                const response = await fetch(`/api/vehicules/findAll?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const result: ApiResponse = await response.json();
                allData.push(...result.data);
                totalPages = result.metadata.totalPages;
                currentPage += 1;
            } while (currentPage <= totalPages);

            // Filtrar los datos basados en los campos de filtro
            const filteredResults = allData.filter((vehicule) =>
                (filters.licensePlate ? vehicule.licensePlate.toLowerCase().includes(filters.licensePlate.toLowerCase()) : true) &&
                (filters.year ? vehicule.year.toString().includes(filters.year) : true) &&
                (filters.make ? vehicule.make.toLowerCase().includes(filters.make.toLowerCase()) : true) &&
                (filters.model ? vehicule.model.toLowerCase().includes(filters.model.toLowerCase()) : true)
            );

            setFilteredData(filteredResults);
        } catch (error) {
            console.error('Error en la búsqueda global:', error);
            alert('Hubo un error al realizar la búsqueda. Por favor, intente nuevamente.');
        } finally {
            setIsSearching(false);
        }
    };

    // Función para limpiar los filtros
    const clearFilters = () => {
        setFilters({
            licensePlate: '',
            year: '',
            make: '',
            model: '',
        });
        setFilteredData(data); 
    };

    const navigateToHistory = (id: number) => {
        router.push(`/dashboard/vehicule/${id}`); 
    };

    return (
        <div className="m-5 bg-white flex flex-col gap-8 rounded-md shadow-lg">
            <div className="px-8 pt-6">
                <h2 className="font-bold text-[1.4em]">Lista de Vehículos</h2>
            </div>

            {/* Filtros */}
            <div className="px-8 flex justify-between items-center gap-2">
                <FormControl>
                    <FormLabel>Placa</FormLabel>
                    <Input
                        value={filters.licensePlate}
                        onChange={(e) => handleFilterChange('licensePlate', e.target.value)}
                        placeholder="Placa"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Año</FormLabel>
                    <Input
                        value={filters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        placeholder="Año"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Marca</FormLabel>
                    <Input
                        value={filters.make}
                        onChange={(e) => handleFilterChange('make', e.target.value)}
                        placeholder="Marca"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Modelo</FormLabel>
                    <Input
                        value={filters.model}
                        onChange={(e) => handleFilterChange('model', e.target.value)}
                        placeholder="Modelo"
                    />
                </FormControl>
                <Button variant="outlined" color="primary" onClick={applyFilters} disabled={isSearching}>
                    {isSearching ? 'Buscando...' : 'Filtrar'}
                </Button>
                <Button variant="outlined" color="neutral" onClick={clearFilters}>
                    Limpiar
                </Button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="hidden md:table-header-group">
                        <tr className="border-b-[1px] border-gray-200 text-gray-400">
                            <th className="Th">Foto</th>
                            <th className="Th">Marca</th>
                            <th className="Th">Modelo</th>
                            <th className="Th">Año</th>
                            <th className="Th">Placa</th>
                            <th className="Th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((vehicule, index) => (
                            <tr
                                key={vehicule.id || index}
                                className="block md:table-row border-b-[1px] border-gray-200 p-4"
                            >
                                <td className="Td" data-label="Foto">
                                    <Image
                                        src={vehicule.photo || '/images/car.png'}
                                        alt={vehicule.make}
                                        width={80}
                                        height={80}
                                    />
                                </td>
                                <td className="Td" data-label="Marca">{vehicule.make}</td>
                                <td className="Td" data-label="Modelo">{vehicule.model}</td>
                                <td className="Td" data-label="Año">{vehicule.year}</td>
                                <td className="Td" data-label="Placa">{vehicule.licensePlate}</td>
                                <td className="Td" data-label="Acciones">
                                    <div className="flex gap-2">
                                        <button
                                            
                                            color="neutral"
                                        // onClick={() => onEdit(vehicule.id, filteredData)}
                                        >
                                            <Icon icon="mdi:pencil" className="flex m-auto text-[1.5em] text-gray-400" />
                                        </button>
                                        <button onClick={() => navigateToHistory(vehicule.id)}>
                                            <Icon icon="material-symbols:history" className="flex m-auto text-[1.5em] text-gray-400" />
                                        </button>

                                        <button
                                            
                                        onClick={() => onDelete(vehicule.id)}
                                        >
                                            <Icon icon="tabler:trash" className="flex m-auto text-[1.5em] text-gray-400" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensaje cuando no hay resultados */}
            {filteredData.length === 0 && !isSearching && (
                <div className="text-center py-4 text-gray-500">
                    No se encontraron vehículos que coincidan con la búsqueda
                </div>
            )}
        </div>
    );
}

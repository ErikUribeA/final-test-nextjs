'use client'
import { IResponseVehicules } from '@/app/core/application/dto';
import { VehiculeService } from '@/app/infrastructure/services/vehicules.service';
import Pagination from '@/UI/molecules/Pagination/Pagination';
import { SeccionButtons } from '@/UI/organims/SeccionButtons/SeccionButtons';
import Tablevehicules from '@/UI/organims/TableVehicules/TableVehicules';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

interface TemplateProps {
    data: IResponseVehicules;

}

export default function TemplateDashboard({ data }: TemplateProps) {
    const useVehiculeService = new VehiculeService()
    const router = useRouter()

    const handleDelete = async (id: number) => {
        try {
            await useVehiculeService.destroy(id);
            console.log("Project deleted successfully");
            toast.success("The project was deleted")
            router.refresh() // Actualiza la página para ver los cambios en tiempo real (sin recargar la página completa)  // Requiere Next.js 11.0.0+  // Requiere react-router-dom 6.0.0+  // Para ver los cambios en tiempo real, puede utilizar el hook useRouter().refresh() en lugar de router.refresh()  // Nota: Este hook no funcionará con Next
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project")
        }
    };
    
    return (
        <div className="p-8">
            <h1 className="text-[2em]">Gestión de Vehículos</h1>
            <SeccionButtons />
            <Tablevehicules data={data.data} onDelete={handleDelete} />
            <Pagination data={data} />
        </div>
    );
}

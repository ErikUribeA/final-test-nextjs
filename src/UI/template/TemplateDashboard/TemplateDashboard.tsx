import { IResponseVehicules } from '@/app/core/application/dto';
import Pagination from '@/UI/molecules/Pagination/Pagination';
import { SeccionButtons } from '@/UI/organims/SeccionButtons/SeccionButtons';
import Tablevehicules from '@/UI/organims/TableVehicules/TableVehicules';
import React from 'react';

interface TemplateProps {
    data: IResponseVehicules;
}

export default function TemplateDashboard({ data }: TemplateProps) {
    return (
        <div className="p-8">
            <h1 className="text-[2em]">Gestión de Vehículos</h1>
            <SeccionButtons />
            <Tablevehicules data={data.data} />
            <Pagination data={data} />
        </div>
    );
}

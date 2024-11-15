import { VehiculeService } from '@/app/infrastructure/services/vehicules.service';
import TemplateDashboard from '@/UI/template/TemplateDashboard/TemplateDashboard';
import React from 'react';

const useVehiculesService = new VehiculeService();

interface IProps {
    searchParams: {
        page?: string;
        size?: string;
    };
}

export const generateMetadata = async ({ searchParams }: IProps) => {
    const page = searchParams.page ?? '1';
    return {
        title: `Services - Página ${page}`,
        description: 'Service of beauty-salon',
    };
};

export default async function ProjectsPage({ searchParams }: IProps) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const size = searchParams.size ? parseInt(searchParams.size) : 4;
    const data = await useVehiculesService.findAll(page, size);

    return (
        <div>
            <TemplateDashboard data={data} />

            
        </div>
    );
}

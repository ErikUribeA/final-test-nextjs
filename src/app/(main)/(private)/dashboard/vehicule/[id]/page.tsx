'use client'
import TemplateVehicule from '@/UI/template/TemplateVehicule/TemplateVehicule';

interface VehicleDetailProps {
    params: { id: number };
}

const VehicleDetailPage = ({ params }: VehicleDetailProps) => {


    return (
        <TemplateVehicule id={params.id} />
    );
};

export default VehicleDetailPage;

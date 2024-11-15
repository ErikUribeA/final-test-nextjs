'use client'
import { RegisterForm } from "@/UI/molecules/Form/NewVehicule";
import { Button } from "@mui/joy";
import React, { useState } from "react";


export const SeccionButtons = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="flex gap-6">
            <button
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
            >
                Agregar Vehiculo
            </button>

            <Button variant="soft">
                Descargar Reporte
            </Button>

            <RegisterForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

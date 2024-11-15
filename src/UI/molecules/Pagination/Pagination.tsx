"use client";
import { IResponseVehicules } from "@/app/core/application/dto";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProps {
    data: IResponseVehicules;
}

function Pagination({ data }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(data.metadata.currentPage); // Estado para manejar la página actual
    const totalPages = data.metadata.totalPages;

    const buttonStyles = "px-3 py-1 border rounded focus:outline-none transition-colors";
    const activeButtonStyles = "bg-blue-500 text-white hover:bg-blue-600";
    const inactiveButtonStyles = "bg-gray-100 text-gray-600 hover:bg-gray-200";

    // Generar el array de páginas
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage); // Cambia la página actual
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString()); // Actualiza el parámetro de la URL
        router.push(`?${params.toString()}`); // Navega a la nueva página
        router.refresh(); // Recarga la página para reflejar los datos actualizados
    };

    // Sincronizar currentPage con los cambios en los datos recibidos
    useEffect(() => {
        setCurrentPage(data.metadata.currentPage);
    }, [data.metadata.currentPage]);

    return (
        <div className="flex justify-center items-center mt-5 gap-3">
            {/* Botones para las páginas */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${buttonStyles} ${page === currentPage ? activeButtonStyles : inactiveButtonStyles}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;

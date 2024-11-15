"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/joy";
import { FormField } from "../FormField/FormField";
import { useState } from "react";
import Image from "next/image";

interface IVehiculeRequest {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
    file?: File;
}

const registerSchema = yup.object().shape({
    make: yup.string().required("La marca es obligatoria"),
    model: yup.string().required("El modelo es obligatoria"),
    year: yup.string().required("El Año es obligatorio"),
    licensePlate: yup.string().required("La placa es obligatorio"),
    file: yup.mixed<File>()
        .optional()
        .test("fileSize", "El archivo es demasiado grande", (value) =>
            value ? value.size <= 5 * 1024 * 1024 : true
        )
        .test("fileType", "Solo se permiten formatos JPG o PNG", (value) =>
            value ? ["image/jpeg", "image/png"].includes(value.type) : true
        ),
});

interface RegisterFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IVehiculeRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleRegister = async (data: IVehiculeRequest) => {
        try {
            const formData = new FormData();
            formData.append("make", data.make);
            formData.append("model", data.model);
            formData.append("year", data.year);
            formData.append("licensePlate", data.licensePlate);
            if (data.file) formData.append("file", data.file);

            const response = await fetch("/api/vehicules/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Error al registrar el usuario", {
                    position: "top-right",
                    autoClose: 3000,
                });
                return;
            }

            toast.success("Vehiculo creado con exito", {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                    onClose();
                },
            });
            router.refresh();

            return await response.json();
        } catch (error) {
            console.error("Error en el POST:", error);
            toast.error("Error inesperado. Por favor, intenta de nuevo.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("file", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[35rem] relative">
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-black">
                            Agregar nuevo vehiculo
                        </h2>

                        <div className="space-y-2">
                            <label htmlFor="file" className="block text-sm font-medium">
                                Foto de Perfil
                            </label>
                            <div className="flex items-center space-x-4">

                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Sin Imagen</span>
                                    )}
                                </div>
                                <Button component="label" variant="soft">
                                    Cargar
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </Button>
                                <Button  variant="soft" color="danger">
                                    Cancelar
                                </Button>
                            </div>
                            {errors.file && (
                                <p className="text-sm text-red-500">{errors.file.message}</p>
                            )}
                        </div>

                        <div className="flex  gap-6">

                            <FormField<IVehiculeRequest>
                                control={control}
                                type="text"
                                label="Marca"
                                name="make"
                                error={errors.make}
                                placeholder="Ingresa la marca"
                            />

                            <FormField<IVehiculeRequest>
                                control={control}
                                type="text"
                                label="Modelo"
                                name="model"
                                error={errors.model}
                                placeholder="Ingresa el modelo"
                            />

                        </div>

                        <div className="flex gap-6">

                            <FormField<IVehiculeRequest>
                                control={control}
                                type="text"
                                label="Año"
                                name="year"
                                error={errors.year}
                                placeholder="Ingresa el año"
                            />

                            <FormField<IVehiculeRequest>
                                control={control}
                                type="text"
                                label="Placa"
                                name="licensePlate"
                                error={errors.licensePlate}
                                placeholder="Ingresa la placa"
                            />

                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="w-full py-2 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-600"
                            >
                                cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-600"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

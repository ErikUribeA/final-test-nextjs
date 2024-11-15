import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = 'https://maintenancesystembc-production.up.railway.app/api/v1';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Obtener el id de los parámetros de la URL
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') || '1'; // Parámetro de página, valor por defecto: 1
    const size = searchParams.get('size') || '10'; // Parámetro de tamaño, valor por defecto: 10

    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Llamada a la API externa con los parámetros `page` y `size`
        const response = await fetch(`${API_BASE_URL}/vehicles/${id}/maintenance?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch vehicle maintenance data from external API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching vehicle maintenance data from external API:', error);
        return NextResponse.json(
            { error: 'Error fetching vehicle maintenance data from external API' },
            { status: 500 }
        );
    }
}

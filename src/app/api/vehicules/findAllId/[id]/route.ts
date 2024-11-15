import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = 'https://maintenancesystembc-production.up.railway.app/api/v1';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Obtener el id de los parámetros de la URL

    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Hacer una llamada a la API externa para obtener el vehículo por ID
        const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch vehicle from external API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching vehicle data from external API:', error);
        return NextResponse.json(
            { error: 'Error fetching vehicle data from external API' },
            { status: 500 }
        );
    }
}

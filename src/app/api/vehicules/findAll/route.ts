import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route";


const API_BASE_URL = 'https://maintenancesystembc-production.up.railway.app/api/v1';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1'; // Obtén el parámetro de página

    try {
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch projects from external API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        return NextResponse.json(
            { error: 'Error fetching data from external API' },
            { status: 500 }
        );
    }
}
'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Icon } from '@iconify/react';


const Sidebar = () => {

    const { data: session } = useSession();

    if (!session) {
        return <div>No has iniciado sesión</div>;
    }

    const user = session.user;

    return (
        <div className="bg-white p-4 space-y-6 w-full h-full">
            {/* Sidebar Header */}
            <div className="text-2xl font-bold text-black border-b-[2px] border-gray-200">Transport Solutions</div>

            <Icon icon="mingcute:user-4-fill" className="flex m-auto text-[4em]" />
            <h1 className="text-center">{user?.name}</h1>

            {/* Navigation Links */}
            <nav className="space-y-4">
                <Link href="/dashboard/vehiculesManagment" className="flex gap-2 items-center bg-gray-200 hover:bg-gray-200 p-2 rounded">
                    Proyectos
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded bg-transparent border-none text-black"
                >
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;

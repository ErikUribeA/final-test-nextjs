/* eslint-disable @typescript-eslint/no-unused-vars */
// @types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            token?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            photo?: string;  // Añadido: propiedad photo
            role?: string;   // Añadido: propiedad role
        };
    }
}

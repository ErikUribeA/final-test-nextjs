import { ILoginRequest, ILoginResponse } from "@/app/core/application/dto";
import { HttpClient } from "../utils/http-client";
import { PAuth } from "@/app/core/application/port";

export class AuthService implements PAuth {
    private clientHttp: HttpClient
    private basePath: string = "auth";

    constructor(){
        this.clientHttp = new HttpClient();
    }
    async login(req: ILoginRequest): Promise<ILoginResponse> {
        return this.clientHttp.post<ILoginResponse, ILoginRequest> (
            `${this.basePath}/login`,
            req
        )
    }
}
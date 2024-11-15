
import { IPostResponse } from "@/app/core/application/dto";
import { HttpClient } from "../utils/httpClient";

export class RegisterService {
    private clientHttp: HttpClient;

    constructor() {
        this.clientHttp = new HttpClient();
    }

    async register(req: FormData): Promise<IPostResponse>{
        const formData = true;
        return await this.clientHttp.post<IPostResponse, FormData>(
            "vehicles",
            req,
            formData
        )
    }
}

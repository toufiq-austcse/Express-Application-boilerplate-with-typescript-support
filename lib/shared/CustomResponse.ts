class CustomResponse{
    code: number;
    status: string;
    message: string;
    data: any;
    constructor(code: number,status:string, message: string,data:any) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data || '';
    }
}

export default CustomResponse;

const getContent = (code: number, status: string, message: string, data: any) => {
    return {
        code: code,
        status: status,
        message: message,
        data: data
    }
}
export default getContent;

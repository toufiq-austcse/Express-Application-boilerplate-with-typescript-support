export interface IShortnerService {
    getShortUrl(url: string): Promise<String>;
}

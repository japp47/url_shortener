import { IUrl } from "@/models/Url";
import UrlRepository from "@/repositories/UrlRepository";
import shortid from "shortid";

export class UrlShortenerServices {
    private urlRepository;
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl?: string): Promise<string> {
        if(!originalUrl) return "";
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url) {
            return url.shortUrl;
        }

        let shortUrl = shortid();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url) {
            shortUrl = shortid();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }

        await this.urlRepository.createUrl(originalUrl, `urls/${shortUrl}`);
        return shortUrl;
    }

    async getAllUrls() {
        return await this.urlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortUrl: string) {
        return await  this.urlRepository.getUrlByShortUrl(shortUrl);
    }
    async getUrlById(id: string): Promise<IUrl | null> {
        return await this.urlRepository.getUrlById(id);
    }

    async deleteUrl(id: string): Promise<IUrl | null> {
        return await this.urlRepository.deleteUrl(id);
    }

    async updateUrl(id: string, newOriginalUrl: string, newShortUrl: string): Promise<IUrl | null> {
        return await this.urlRepository.updateUrl(id, newOriginalUrl, newShortUrl);
    }
}
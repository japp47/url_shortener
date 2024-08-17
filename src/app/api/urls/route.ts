import { NextRequest,NextResponse } from "next/server";
import {UrlShortenerServices} from "@/services/UrlShortenerService";
import { cache } from "react";


async function getQueryParam(req: NextRequest, key: string): Promise<string | null> {
    const url = new URL(req.url);
    return url.searchParams.get(key);
}

const fetchUrls = cache(async(req: NextRequest) => {
    const shortenerService = new UrlShortenerServices();
    const queryParams = await getQueryParam(req, 'id'); // Example for getting a URL by ID
    let response;
    if (queryParams) {
        response = await shortenerService.getUrlById(queryParams);
    } else {
        response = await shortenerService.getAllUrls();
    }
    return response;
})
export async function GET(req: NextRequest) {
    
    const urls = await fetchUrls(req);
    const response = NextResponse.json({urls})
    response.headers.set('Cachee-control','public, max-age=180 s-maxage=180, stale-while-revalidate=59');
    return response
}

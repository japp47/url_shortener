import {UrlShortenerServices} from "@/services/UrlShortenerService";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: Request) {
    const {originalUrl} = await req.json();
    const shortenerService = new UrlShortenerServices();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    return NextResponse.json({shortUrl}, {status: 201});

}


export async function PUT(req: NextRequest) {
    const { id, newOriginalUrl, newShortUrl } = await req.json();
    const shortenerService = new UrlShortenerServices();
    const updatedUrl = await shortenerService.updateUrl(id, newOriginalUrl, newShortUrl);
    return NextResponse.json(updatedUrl);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const shortenerService = new UrlShortenerServices();
    const deletedUrl = await shortenerService.deleteUrl(id);
    return NextResponse.json(deletedUrl);
}
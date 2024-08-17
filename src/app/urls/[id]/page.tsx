import { UrlShortenerServices } from "@/services/UrlShortenerService";
import { redirect } from "next/navigation";
async function fetchOriginalUrl(url: string) {
    const urlServer = new UrlShortenerServices();
    const response =  await urlServer.getUrlByShortUrl(url);
    return response?.originalUrl;
}
export default async function urlRedirect({params}:{params: {id: string}}) {
    const original = await fetchOriginalUrl(`urls/${params.id}`)
    if (original) redirect(original);

    redirect('/404');
    return null;
}
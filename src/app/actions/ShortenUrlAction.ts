'use server'

import { UrlShortenerServices } from "@/services/UrlShortenerService";
import { revalidatePath } from "next/cache";
const shortenUrl = async (formData: FormData) => {
    const originalUrl : string = formData.get('originalUrl') as string;
    const shortenerService = new UrlShortenerServices();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    revalidatePath('/urls');

}
export default shortenUrl
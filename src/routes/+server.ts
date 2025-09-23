import type { RequestHandler } from './$types';
import crypto from "crypto";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    // 1. Убираем hash из объекта
    const { hash, ...userData } = data;

    // 2. Собираем "проверочную строку"
    const checkString = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`)
        .join("\n");

    // 3. Получаем секретный ключ
    const secretKey = crypto
        .createHash("sha256")
        .update(BOT_TOKEN)
        .digest();

    // 4. Вычисляем подпись
    const hmac = crypto
        .createHmac("sha256", secretKey)
        .update(checkString)
        .digest("hex");

    if (hmac !== hash) {
        return new Response("Invalid hash", { status: 403 });
    }

    // Если всё ок → сохраняем сессию
    // (можно использовать JWT или sveltekit session cookie)
    return new Response(JSON.stringify({ ok: true, user: userData }));
};

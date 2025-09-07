<script>
    import { onMount } from "svelte";

    onMount(() => {
        // загружаем SDK Telegram Login
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", "best_debug_bot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-userpic", "false");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");
        document.getElementById("telegram-login").appendChild(script);

        // создаём глобальный обработчик
        window.onTelegramAuth = (user) => {
            console.log("Telegram user:", user);

            // тут можно отправить данные на свой backend
            fetch("/api/auth/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        };
    });
</script>

<div id="telegram-login"></div>

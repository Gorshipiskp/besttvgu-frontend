<script>
    import { onMount } from "svelte";
    import {writable} from "svelte/store";

    let userInfo = writable(undefined);

    onMount(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", "best_debug_bot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-userpic", "true");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");

        window.onTelegramAuth = (user) => {
            console.log("Telegram user:", user);
            alert(user)

            userInfo.set(user);

            // fetch("/api/auth/telegram", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(user)
            // });
        };

        document.getElementById("telegram-login").appendChild(script);
    });
</script>

<div id="telegram-login"></div>

{#if $userInfo !== undefined}
    {$userInfo}
    {$userInfo.name}
    123123123123123123
{/if}

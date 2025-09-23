<script lang="ts">
    import {PUBLIC_BOT_USERNAME} from "$env/static/public";
    import {onMount} from "svelte";
    import {getJWT, setJWT} from "../lib/misc";
    import {userInfoStore} from "../lib/stores";
    import FirstEnterYourInfo from "./FirstEnterYourInfo.svelte";
    import {dev} from "$app/environment";
    import type {LoggedInPostReturn} from "../lib/requests";
    import {userLogIn} from "../lib/requests";

    let showFirstEnterYourInfo: boolean = false;

    onMount(() => {
        const script = document.createElement("script");

        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", PUBLIC_BOT_USERNAME);
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-userpic", "true");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");

        window["onTelegramAuth"] = async (user) => {
            const userInfo: LoggedInPostReturn = await userLogIn(user);

            setJWT(userInfo.access_token);

            userInfoStore.set(userInfo.user_info);

            if (userInfo.is_first_auth) {
                showFirstEnterYourInfo = true;
            }
        };

        if (!getJWT() && dev) {
            setTimeout(() => {
                window["onTelegramAuth"]({
                    "telegram_id": 1518697908,
                    "nickname": "Gorshipisk",
                })
            }, 3000)
        }

        document.getElementById("telegram-login").appendChild(script);
    });
</script>


{#if showFirstEnterYourInfo}
    <FirstEnterYourInfo userInfo={$userInfoStore}/>
{:else}
    <div id="telegram-login"></div>
{/if}

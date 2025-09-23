<script lang="ts">
    import TelegramOAuth from "../widgets/TelegramOAuth.svelte";
    import {getJWT, removeJWT} from "../lib/misc";
    import {browser} from "$app/environment";
    import {userInfoStore} from "../lib/stores";
    import Spinner from "../widgets/Spinner.svelte";
    import ChooseGroup from "../widgets/ChooseGroup.svelte";
    import type {UserGeneralInfo} from "../lib/requests";
    import {getUserInfo} from "../lib/requests";
    import CancelJoinRequest from "../widgets/HasJoinRequest.svelte";
    import Main from "../pages/Main.svelte";

    let curJWT: string | null;
    if (browser) {
        curJWT = getJWT();
    }

    function updateUserInfoStore(userInfo: UserGeneralInfo | { error: string }) {
        if ("error" in userInfo) {
            console.error(userInfo.error);
            removeJWT();

            window.location.reload();
            return
        }

        userInfoStore.set(userInfo);
    }
</script>

{#if browser}
    <main>
        {#if curJWT === null}
            <TelegramOAuth/>
        {:else}
            {#await getUserInfo(updateUserInfoStore)}
                <Spinner/>
            {:then _}
                {#if $userInfoStore.groups.length === 0}
                    {#if $userInfoStore.join_request === null}
                        <ChooseGroup/>
                    {:else}
                        <CancelJoinRequest/>
                    {/if}
                {:else}
                    <Main/>
                {/if}
            {/await}
        {/if}
    </main>
{/if}

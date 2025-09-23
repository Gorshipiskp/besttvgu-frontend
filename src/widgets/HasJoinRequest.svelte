<script lang="ts">

    import {userInfoStore} from "../lib/stores";
    import {API} from "../lib/requests";

    async function cancelJoinRequest() {
        await API.post({
            endpoint: "cancel_join_request",
            convertType: "JSON",
            body: {
                group_id: $userInfoStore!.join_request.group_id,
            },
            callbacks: {
                onSuccess: () => {
                    $userInfoStore!.join_request = null;
                }
            }
        })
    }
</script>

<h2>Вы подали заявку на вступление в группу {$userInfoStore.join_request.group_name}</h2>
<button on:click={cancelJoinRequest}>Отменить заявку</button>

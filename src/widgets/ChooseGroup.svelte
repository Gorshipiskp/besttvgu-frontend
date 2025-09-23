<script lang="ts">

    import type {GroupShort} from "../lib/requests";
    import {API, getGroupsAndFaculties} from "../lib/requests";
    import Spinner from "./Spinner.svelte";

    function groupsCompare(g1: GroupShort, g2: GroupShort) {
        const g1Course = g1.course + (g1.group_type === "regular" ? 0 : 100)
        const g2Course = g2.course + (g2.group_type === "regular" ? 0 : 100)

        if (g1Course > g2Course) {
            return 1
        }
        if (g1Course < g2Course) {
            return -1
        }
        if (g1Course === g2Course) {
            return g1.group_number - g2.group_number
        }
    }

    async function chooseGroup(group: GroupShort) {
        await API.post({
            endpoint: "choose_group",
            convertType: "JSON",
            body: {
                group_id: group.id
            },
            callbacks: {
                onSuccess: () => {
                    window.location.reload();
                }
            }
        })
    }
</script>

<div>
    <h2>Вы не состоите ни в одной группе</h2>
    <h3>Вы можете подать заявку на вступление</h3>

    {#await getGroupsAndFaculties()}
        <Spinner/>
    {:then faculties_groups}
        {#if Object.keys(faculties_groups.faculties_groups).length === 0 }
            <h3>Групп не найдено, попробуйте через пару дней</h3>
        {:else}
            {#each Object.entries(faculties_groups.faculties_groups) as [fac_id, fac_groups] (fac_id)}
                {@const curFaculty = faculties_groups.faculties[fac_id]}
                <h4>{curFaculty.name} ({curFaculty.code})</h4>

                {#each fac_groups.sort(groupsCompare) as group (group.name)}
                    {#if !group.no_new_requests}
                        <button on:click={() => chooseGroup(group)}>{group.name}</button>
                    {/if}
                {/each}
            {/each}
        {/if}
    {/await}
</div>

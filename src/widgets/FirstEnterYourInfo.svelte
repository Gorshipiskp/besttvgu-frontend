<script lang="ts">
    import {userInfoStore} from "../lib/stores";
    import type {UserGeneralInfo} from "../lib/requests";
    import {updateUserInfo} from "../lib/requests";

    export let userInfo: UserGeneralInfo;

    let nickname: string = userInfo.nickname ?? "";
    let firstname: string = userInfo.firstname ?? "";
    let lastname: string = userInfo.lastname ?? "";
    let patronymic: string = userInfo.patronymic ?? "";
    let is_in_dormitory: boolean = userInfo.is_in_dormitory ?? false;

    const nicknameRegex = /^[A-Za-zа-яА-ЯёЁ0-9]{2,30}$/;
    const firstnameRegex = /^[а-яА-ЯёЕ]{2,30}$/;
    const lastnameRegex = /^[а-яА-ЯёЕ]{2,30}$/;
    const patronymicRegex = /^[а-яА-ЯёЕ]{2,30}$/;

    async function onSubmit(event: Event) {
        event.preventDefault();

        const regexChecks: (RegExpMatchArray | true | null)[] = [
            nickname === "" ? true : nickname.match(nicknameRegex),
            firstname === "" ? true : firstname.match(firstnameRegex),
            lastname === "" ? true : lastname.match(lastnameRegex),
            patronymic === "" ? true : patronymic.match(patronymicRegex)
        ]

        if (regexChecks.includes(null)) {
            // todo: Добавить уведомление
            return;
        }

        await updateUserInfo({
            firstname: firstname,
            is_in_dormitory: is_in_dormitory,
            lastname: lastname,
            nickname: nickname,
            patronymic: patronymic
        }, async (new_info: UserGeneralInfo): Promise<void> => {
            userInfoStore.set(new_info);
            window.location.href = "/";
        })
    }
</script>

<span>Выдуманные ФИО</span>
<form>
    <label for="nickname_input" title="Nickname">
        <input id="nickname_input" type="text" placeholder="Псевдоним"
               bind:value={nickname} pattern={nicknameRegex}>
    </label>
    <label for="firstname_input" title="Имя">
        <input id="firstname_input" type="text" placeholder="Имя"
               bind:value={firstname} pattern={firstnameRegex}>
    </label>
    <label for="lastname_input" title="Фамилия">
        <input id="lastname_input" type="text" placeholder="Фамилия"
               bind:value={lastname} pattern={lastnameRegex}>
    </label>
    <label for="patronymic_input" title="Отчество">
        <input id="patronymic_input" type="text" placeholder="Отчество" pattern={patronymicRegex}
               bind:value={patronymic}>
    </label>
    <label for="is_in_dormitory_input" title="Проживаете в общежитии">
        <input id="is_in_dormitory_input" type="checkbox" placeholder="Проживаете в общежитии"
               bind:checked={is_in_dormitory}>
    </label>
    <button type="submit" on:click={onSubmit}>Сохранить</button>
</form>

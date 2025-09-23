import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {UserGeneralInfo} from "./requests";

export let userInfoStore: Writable<UserGeneralInfo | undefined> = writable(undefined)

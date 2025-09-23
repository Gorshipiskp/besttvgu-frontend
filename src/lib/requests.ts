import type {MiddlewareContext, MiddlewareFuncReturn} from "./bestfetch/bestfetch";
import {BestFetch} from "./bestfetch/bestfetch";
import {getJWT, removeJWT} from "./misc";


export interface Group {
    role_id: number,
    subgroup: number,
    name: string,
    course: number,
    group_number: number,
    group_type: string,
    no_schedule: boolean,
    no_new_requests: boolean,
    note: string
}

export interface JoinRequest {
    group_id: number,
    status: string,
    created_at: string,
    group_name: string
}


export interface UserGeneralInfo {
    nickname: string,
    is_in_dormitory: boolean
    firstname?: string,
    lastname?: string,
    patronymic?: string,
    groups: Group[],
    join_request: JoinRequest | null,
}

export const API: BestFetch = new BestFetch({
    baseUrl: "http://127.0.0.1:8000",
    defaultRetryOptions: {
        minDelay: 500,
        maxDelay: 10000,
        maxAttempts: 5
    },
    defaultCallbacks: {
        onSuccess: (res: any): any => {
            return res;
        },
        onError: (response: Response, isLastAttempt?: boolean): boolean => {
            if (response.status === 401) {
                removeJWT();
                window.location.reload()
                return false;
            }

            return true;
        },
        onNetworkError: (response: Response, isLastAttempt?: boolean): boolean => {
            return true;
        }
    }
});

API.use("JWT_AUTH",
    (request: Request, _: MiddlewareContext): MiddlewareFuncReturn => {
        request.headers.set("Authorization", `Bearer ${getJWT()}`);

        return {
            request: request,
            stopPropagation: false
        }
    });

interface TelegramInfo {
    telegram_id: number,
    nickname: string
}

export interface LoggedInPostReturn {
    is_first_auth: boolean;
    user_info: UserGeneralInfo;
    access_token: string;
    token_type: string;
}

export async function userLogIn(telegramInfo: TelegramInfo): Promise<LoggedInPostReturn> {
    return await API.post({
        endpoint: "log_in",
        convertType: "JSON",
        body: {
            telegram_id: telegramInfo.telegram_id,
            nickname: telegramInfo.nickname
        },
        callbacks: {
            onSuccess: (res: LoggedInPostReturn): LoggedInPostReturn => {
                return res;
            },
        }
    })
}


interface UpdatedInfoPost {
    nickname?: string,
    firstname?: string,
    lastname?: string,
    patronymic?: string,
    is_in_dormitory?: boolean
}

export async function updateUserInfo(updatedInfo: UpdatedInfoPost, onSuccess: (new_info: UpdatedInfoPost) => any): Promise<UpdatedInfoPost> {
    return await API.post({
        endpoint: "update_user_info",
        convertType: "JSON",
        body: updatedInfo,
        callbacks: {
            onSuccess: onSuccess
        },
    })
}

export async function getUserInfo(successCallback: (new_info: UserGeneralInfo) => any): Promise<UserGeneralInfo> {
    return await API.get({
        endpoint: "get_user_info",
        convertType: "JSON",
        callbacks: {
            onSuccess: successCallback
        }
    })
}

export interface Faculty {
    id: number,
    name: string,
    code: string
}

export type GROUP_TYPES = "regular" | "master"

export interface GroupShort {
    id: number,
    name: string
    course: number,
    group_number: number,
    no_new_requests: boolean
    group_type: GROUP_TYPES
}

export interface FacultiesGroups {
    faculties: Record<number, Faculty>,
    faculties_groups: Record<number, GroupShort>
}

export async function getGroupsAndFaculties(): Promise<FacultiesGroups> {
    return await API.get({
        endpoint: "get_groups_n_faculties",
        convertType: "JSON",
        callbacks: {
            onSuccess: (groups: FacultiesGroups): FacultiesGroups => {
                return groups;
            }
        }
    })
}
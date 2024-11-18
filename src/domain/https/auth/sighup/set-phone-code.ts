// @ts-ignore
import {AuthSignupSendPhoneCode} from "../../../const/model/req.ts";
// @ts-ignore
import * as consts from "../../../const/https/req.ts";
// @ts-ignore
import * as constants from "../../../const/https/req.ts";
import axios from "axios";

export default async function SetPhoneCode(phone: string, code: number, token: string):
    Promise<AuthSignupSendPhoneCode> {
    return await consts.instanceOAuthApi.post<AuthSignupSendPhoneCode>(
        constants.API_GROUPS["OAUTH_API_V1_GET_PHONE_CODE"],
        {
            phone: phone.replace(/[^0-9]/gm, ""),
            code: Number(code)
        },
        {
            headers: {
                "X-TempAuth-Token": token,
                "Content-type": "application/json"
            }
        }
    ).then(r => {
        return r.data
    }).catch(e => {
        let localRes: AuthSignupSendPhoneCode = {
            error: true,
            message: e.response.data?.message,
            status: e.response.data?.status,
            payload: null
        }

        if (axios.isAxiosError(e)) {
            if (e.code === "ERR_NETWORK") {
                localRes.message = "Ошибка получения данных с сервера"
            } else if (e.code === "ERR_CONNECTION_REFUSED") {
                localRes.message = "Ошибка соединения с сервером"
            }
        } else {
            localRes.message = "Неизвестная сетевая ошибка"
        }

        return localRes
    })
}
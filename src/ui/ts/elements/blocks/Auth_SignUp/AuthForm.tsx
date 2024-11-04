import * as React from "react";
// @ts-ignore
import ExtAuthV1 from "../../../../../domain/https/auth/entrance/ext-auth-v1.ts";
// @ts-ignore
import AuthFromAside from "./AuthFromAside.tsx";

export default function AuthForm(): React.JSX.Element {
    const loginRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

    const [highLightLogin, setHighLightLogin] = React.useState<boolean>(false)
    const [highLightPassword, setHighLightPassword] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)
    const [extAuthPending, setExtAuthPending] = React.useState<boolean>(false)

    const showUpLoginError = (e: string, changefunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        changefunc(true)
        setError(e)
        setTimeout(() => {
            changefunc(false)
            setError(null)
        }, 2500)
    }

    return <article
        className="flex p-6 rounded-2xl bg-gray-900/70 backdrop-blur-md"
    >
        <aside className="flex flex-col items-center space-y-4 p-6">
            <h1 className="text-2xl">
                Авторизация
            </h1>
            <input
                type="text"
                ref={loginRef}
                placeholder="Логин"
                className={!highLightLogin ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            />
            <input
                type="password"
                ref={passwordRef}
                placeholder="Пароль"
                className={!highLightPassword ? "p-2 rounded-md border-2 border-gray-600 bg-gray-600 focus:border-blue-500" : "p-2 text-pink-700 rounded-md border-2 border-pink-700 bg-pink-300"}
            />
            <p className="text-red-500 font-semibold">{error}</p>
            <button
                className="p-2 bg-blue-500 w-28 rounded-md"
                onClick={() => {
                    if (extAuthPending) return
                    if (loginRef.current.value === null || loginRef.current.value === "") {
                        showUpLoginError("Заполните пустое поле", setHighLightLogin)
                    } else if (passwordRef.current.value === null || passwordRef.current.value === "") {
                        showUpLoginError("Заполните пустое поле", setHighLightPassword)
                    } else {
                        setExtAuthPending(true)
                        ExtAuthV1(loginRef.current.value).then(callback => {
                            setExtAuthPending(false)
                            console.log(callback)
                        })
                    }
                }}
            >
                Войти
            </button>
        </aside>
        <AuthFromAside
            text={"Впервые на Aster?"}
            button={<button
                id="s"
                className="p-2 bg-violet-500 w-48 rounded-md"
                onClick={() => {
                    window.location.href = "/s"
                }}
            >
                Создать аккаунт
            </button>}
        />
    </article>
}
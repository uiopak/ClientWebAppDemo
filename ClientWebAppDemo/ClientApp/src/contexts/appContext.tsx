import { createSignal, createContext, useContext, from, onMount, createEffect, createResource } from "solid-js";
import { UsernameRes } from "../components/types";

// https://www.solidjs.com/guides/typescript#context


export async function http<T>(
    request: RequestInfo
): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}


export const makeAppContext = (connected = false) => {
    const fetchUsername = async () =>
        (await fetch(`/api/Auth/username`)).json();

    const [usernameRes, { mutate, refetch: refetchUsernameRes }] = createResource<UsernameRes>(fetchUsername);

    const [username, setUsername] = createSignal("");
    const [logged, setLogged] = createSignal(false);

    createEffect(() => {
        if (usernameRes.state=="ready") {
            setUsername(usernameRes()?.username)
            setLogged(usernameRes()?.loggedIn)
        }
    })

    return [
        username,
        logged,
        refetchUsernameRes
        ] as const;
    // `as const` forces tuple type inference
};
export type AppContextType = ReturnType<typeof makeAppContext>;
export const AppContext = createContext<AppContextType>(); // makeAppContext(false) is required here or it will have | undefined
export const useAppContext = () => useContext(AppContext)!; // '!' asserts that the context is always provided (so no | undefined), 
// because I use AppProvider definied below it will be true

export function AppProvider(props: any) {
    return (
        <AppContext.Provider value={makeAppContext(props.conection || false)}>
            {props.children}
        </AppContext.Provider>
    );
}

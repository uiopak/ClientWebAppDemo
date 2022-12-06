import { A, Outlet, useLocation, useNavigate } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import Tc from "../components/tc";
import { UsernameRes } from "../components/types";
import { useAppContext } from "../contexts/appContext";



export default function PageWrapper() {
    const [
        username,
        logged,
        refetchUsernameRes
    ] = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    function navigateLogin() {
        navigate("/login", { state: { pathname: location.pathname, search: location.search } });
    }

    async function logout() {
        await fetch(`/api/Auth/logout`);
        refetchUsernameRes();
    }

    return (
        <>
            <div class="navbar bg-base-200">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><A href="/contacts">Contacts</A></li>
                            <li><A href="/about">About</A></li>
                        </ul>
                    </div>
                    <A class="btn btn-ghost normal-case text-xl no-animation" href="/">Home</A>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal rounded-box p-0">
                        <li><A href="/contacts">Contacts</A></li>
                        <li><A href="/about">About</A></li>
                    </ul>
                </div>
                <div class="navbar-end gap-1">
                    <button class="btn btn-ghost flex-none bg-base-100 normal-case text-xl no-animation">
                        <Show when={logged()} fallback={<span>Hello guest!</span>}>
                            <span>Hello {username}</span>
                        </Show>
                    </button>
                    <Show when={logged()} fallback={
                        <button class="btn btn-ghost flex-none bg-base-100 normal-case text-xl no-animation" onClick={() => navigateLogin()}>
                            <span>Login</span>
                        </button>
                    }>
                        <button class="btn btn-ghost flex-none bg-base-100 normal-case text-xl no-animation" onClick={() => logout()}>
                            <span>Logout</span>
                        </button>
                    </Show>
                    <div class="flex-none">
                        <Tc />
                    </div>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </>
    );
}

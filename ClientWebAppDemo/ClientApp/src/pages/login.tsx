import { useLocation, useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { useAppContext } from '../contexts/appContext';

export default function Login() {
    const [
        username,
        logged,
        refetchUsernameRes
    ] = useAppContext();

    const [login, setLogin] = createSignal("");
    const [message, setMessage] = createSignal("");
    const [password, setPasword] = createSignal("");
    const navigate = useNavigate();
    const location = useLocation();

    async function postLogin() {
        const response = await fetch(`/api/Auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({ "username": login(), "password": password() })
        });
        const resp = await response.text();
        if (resp === 'authenticated') {
            refetchUsernameRes();
            var res = location.state;
            if (res === null) {
                navigate("/contacts")
            }
            else {
                if (res.pathname !== null && res.search !== null)
                    navigate(`${res.pathname}${res.search}`)
            }
        }
        else {
            setMessage('Login or password is incorrect');
        }
    }

    return (
        <section class="bg-base-100 text-base-700 p-4">
            <div class="card shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Login</span>
                        </label>
                        <input type="text" placeholder="login" value={login()} class="input input-bordered"
                            onChange={(e) => { setLogin(e.currentTarget.value) }} />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" value={password()} class="input input-bordered"
                            onChange={(e) => { setPasword(e.currentTarget.value) }} />
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" onClick={() => postLogin()}>Login</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

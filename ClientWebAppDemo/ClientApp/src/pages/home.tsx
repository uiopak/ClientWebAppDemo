import { createSignal } from 'solid-js';

export default function Home() {

    return (
        <section class="bg-base-100 text-base-700 p-4">
            <h1 class="text-2xl font-bold">Demo app:</h1>
            <p class="mt-4">Contact - contact list</p>
            <p class="mt-4">Login - login to edit, delete and add new contacts</p>
            <p class="mt-4">About - information about app</p>
        </section>
    );
}

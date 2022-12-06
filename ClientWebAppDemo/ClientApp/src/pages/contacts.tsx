import { A, useNavigate } from '@solidjs/router';
import { createResource, createSignal, For, onMount } from 'solid-js';
import { Contact, Category } from '../components/types';
import { useAppContext } from '../contexts/appContext';

export default function Contacts() {
    const [
        username,
        logged,
        refetchUsernameRes
    ] = useAppContext();

    const navigate = useNavigate();
    const fetchContacts = async () =>
        (await fetch(`/api/Contacts`)).json();

    function navigateCreateNew() {
        navigate("/contacts/new");
    }


    function ContactCategoryString(contact: Contact) {
        if (contact.category != null) {
            if (contact.category.name == "Prywatny") {
                return "Prywatny"
            }
            else if (contact.category.name == "Służbowy") {
                if (contact.subcategory != null) {
                    return contact.subcategory.name
                }
                else {
                    return "Służbowy"
                }
            }
            else if (contact.category.name == "Inny") {
                if (contact.customSubcategory != null) {
                    return contact.customSubcategory
                }
                else {
                    return "Inny"
                }
            }
            else {
                return contact.category.name
            }
        }
        else {
            return ""
        }
    }

    const [contacts, { mutate, refetch }] = createResource<Contact[]>(fetchContacts);

    return (
        <section class="bg-base-100 text-base-700 p-4">
            <div class="overflow-x-auto">
                <button class="btn m-2" onclick={() => refetch()}>Refresh</button>
                <button class="btn btn-primary" disabled={!logged()} onclick={() => navigateCreateNew()}>Add new</button>
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={contacts()} fallback=
                            {
                                <tr>
                                    Loading...
                                </tr>
                            }>
                            {(item, index) => (
                                <tr onClick={() => navigate(`/contacts/${item.contactId}`)} class="cursor-pointer hover">
                                    <th>{item.contactId}</th>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{ContactCategoryString(item)}</td>
                                </tr>
                            )
                            }
                        </For>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

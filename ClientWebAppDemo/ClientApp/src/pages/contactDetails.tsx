import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, createResource, createSignal, For, lazy, Show, Suspense } from 'solid-js';
import { Category, Contact, Subcategory } from '../components/types';
import { useAppContext } from '../contexts/appContext';


export default function ContactDetails() {
    const [
        username,
        logged,
        refetchUsernameRes
    ] = useAppContext();
    const navigate = useNavigate();
    const [newContact, setNewContact] = createSignal(false);

    const [edit, setEdit] = createSignal(false);

    function toggleEdit() {
        setEdit(!edit())
        console.log("toggleEdit" + edit())
    }

    const fetchContact = async (id: string) =>
        (await fetch(`/api/Contacts/${id}/`)).json();

    const fetchCategories = async () =>
        (await fetch(`/api/Categories/`)).json();

    const fetchSubcategories = async () =>
        (await fetch(`/api/Subcategories/`)).json();

    const deleteContact = async () => {
        await fetch(`/api/Contacts/${contact()?.contactId}`, {
            method: "DELETE"
        })
        navigate("/contacts", { replace: true })
    };

    const postContact = async () => {
        await refetchUsernameRes()
        if (logged()) {
            await fetch(`/api/Contacts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact())
            })
            navigate("/contacts", { replace: true })
        }
    };

    const putContact = async () => {
        await refetchUsernameRes()
        if (logged()) {
            await fetch(`/api/Contacts/${contact()?.contactId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact())
            })
        }
    };

    const sendContact = async () => {
        if (logged()) {
            if (edit()) {
                if (newContact()) {
                    postContact();
                }
                else {
                    putContact()
                }
            }
        }
    }

    const [categories] = createResource<Category[]>(fetchCategories);
    const [subcategories] = createResource<Subcategory[]>(fetchSubcategories);

    const params = useParams();

    if (params.id == "new") {
        setNewContact(true)
    }

    createEffect(() => {
        if (newContact()) {
            if (!logged()) {
                setEdit(false)
            }
            else {
                setEdit(true)
            }
        }
    })
    const [contact, { mutate, refetch }] = createResource<Contact, string>(() => params.id, fetchContact);

    return (
        <section class="bg-base-100 text-base-700 p-4">
            <div class="card shadow-2xl bg-base-100">
                <div class="card-body">
                    <Suspense fallback={<p>Loading...</p>}>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="First Name" value={contact()?.firstName != null ? contact()?.firstName?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (contact.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: e.currentTarget.value,
                                                lastName: contact().lastName,
                                                email: contact().email,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: contact().subcategory,
                                                subcategoryId: contact().subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            mutate(cont)
                                        }
                                    }}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="Last Name" value={contact()?.lastName != null ? contact()?.lastName?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (contact.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: contact().firstName,
                                                lastName: e.currentTarget.value,
                                                email: contact().email,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: contact().subcategory,
                                                subcategoryId: contact().subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            mutate(cont)
                                        }
                                    }}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email" value={contact()?.email != null ? contact()?.email?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (contact.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: contact().firstName,
                                                lastName: contact().lastName,
                                                email: e.currentTarget.value,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: contact().subcategory,
                                                subcategoryId: contact().subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            mutate(cont)
                                        }
                                    }}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="Password" value={contact()?.password != null ? contact()?.password?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (/^(?=(.*\d){1})(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/.test(e.currentTarget.value)) {
                                            if (contact.state == "ready") {
                                                var cont: Contact = {
                                                    contactId: contact().contactId,
                                                    firstName: contact().firstName,
                                                    lastName: contact().lastName,
                                                    email: contact().email,
                                                    password: e.currentTarget.value,
                                                    category: contact().category,
                                                    categoryId: contact().categoryId,
                                                    subcategory: contact().subcategory,
                                                    subcategoryId: contact().subcategoryId,
                                                    customSubcategory: contact().customSubcategory,
                                                    phoneNumber: contact().phoneNumber,
                                                    birthday: contact().birthday
                                                }
                                                mutate(cont)
                                            }
                                        }
                                    }}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Category</span>
                            </label>
                            <select class="select select-bordered w-full" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={(e) => {
                                    if (contact.state == "ready" && categories.state == "ready") {
                                        var cont: Contact = {
                                            contactId: contact().contactId,
                                            firstName: contact().firstName,
                                            lastName: contact().lastName,
                                            email: contact().email,
                                            password: contact().password,
                                            category: categories()[e.currentTarget.selectedIndex - 1],
                                            categoryId: categories()[e.currentTarget.selectedIndex - 1].categoryId,
                                            subcategory: contact().subcategory,
                                            subcategoryId: contact().subcategoryId,
                                            customSubcategory: contact().customSubcategory,
                                            phoneNumber: contact().phoneNumber,
                                            birthday: contact().birthday
                                        }
                                        mutate(cont)
                                    }
                                }
                                }
                            >
                                <option selected={contact()?.categoryId == null}>Category</option>
                                <For each={categories()}>
                                    {(item, index) => (
                                        <option selected={contact()?.categoryId == item.categoryId}>{item.name}</option>
                                    )
                                    }
                                </For>
                            </select>
                        </div>
                        <Show when={contact()?.category != null && contact()?.category?.name == "Służbowy"}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Subcategory</span>
                                </label>
                                <select class="select select-bordered w-full" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                    onChange={(e) => {
                                        if (contact.state == "ready" && subcategories.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: contact().firstName,
                                                lastName: contact().lastName,
                                                email: contact().email,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: subcategories()[e.currentTarget.selectedIndex - 1],
                                                subcategoryId: subcategories()[e.currentTarget.selectedIndex - 1].subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            mutate(cont)
                                        }
                                    }
                                    }
                                >
                                    <option selected={contact()?.subcategoryId == null}>Subcategory</option>
                                    <For each={subcategories()}>
                                        {(item, index) => (
                                            <option selected={contact()?.subcategoryId == item.subcategoryId}>{item.name}</option>
                                        )
                                        }
                                    </For>
                                </select>
                            </div>
                        </Show>
                        <Show when={contact()?.category != null && contact()?.category?.name == "Inny"}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Custom Subcategory</span>
                                </label>
                                <input type="text" placeholder="Custom Subcategory" value={contact()?.customSubcategory != null ? contact()?.customSubcategory?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                    onChange={
                                        (e) => {
                                            if (contact.state == "ready") {
                                                var cont: Contact = {
                                                    contactId: contact().contactId,
                                                    firstName: contact().firstName,
                                                    lastName: contact().lastName,
                                                    email: contact().email,
                                                    password: contact().password,
                                                    category: contact().category,
                                                    categoryId: contact().categoryId,
                                                    subcategory: contact().subcategory,
                                                    subcategoryId: contact().subcategoryId,
                                                    customSubcategory: contact().customSubcategory,
                                                    phoneNumber: contact().phoneNumber,
                                                    birthday: contact().birthday
                                                }
                                                cont.customSubcategory = (e.currentTarget.value)
                                                mutate(cont)
                                            }
                                        }}
                                />
                            </div>
                        </Show>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="text" placeholder="Phone Number" value={contact()?.phoneNumber != null ? contact()?.phoneNumber?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (contact.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: contact().firstName,
                                                lastName: contact().lastName,
                                                email: contact().email,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: contact().subcategory,
                                                subcategoryId: contact().subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            cont.phoneNumber = (e.currentTarget.value)
                                            mutate(cont)
                                        }
                                    }}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Birthday (DD.MM.YYYY)</span>
                            </label>
                            <input type="text" placeholder="Birthday" value={contact()?.birthday != null ? contact()?.birthday?.toString() : ""} class="input input-bordered" style={`${!edit() ? 'cursor: default;' : ''}`} disabled={!edit()}
                                onChange={
                                    (e) => {
                                        if (contact.state == "ready") {
                                            var cont: Contact = {
                                                contactId: contact().contactId,
                                                firstName: contact().firstName,
                                                lastName: contact().lastName,
                                                email: contact().email,
                                                password: contact().password,
                                                category: contact().category,
                                                categoryId: contact().categoryId,
                                                subcategory: contact().subcategory,
                                                subcategoryId: contact().subcategoryId,
                                                customSubcategory: contact().customSubcategory,
                                                phoneNumber: contact().phoneNumber,
                                                birthday: contact().birthday
                                            }
                                            cont.birthday = (e.currentTarget.value)
                                            mutate(cont)
                                        }
                                    }}
                            />
                        </div>
                        <Show when={logged()}>
                            <Show when={!newContact()}>
                                <button class="btn btn-primary" disabled={!logged()} onclick={() => toggleEdit()}>Edit</button>
                            </Show>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary" disabled={!edit()} onClick={() => sendContact()}>Save</button>
                            </div>
                            <Show when={!newContact()}>
                                <button class="btn btn-primary" disabled={!edit()} onclick={() => deleteContact()}>Delete</button >
                            </Show>
                        </Show>
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

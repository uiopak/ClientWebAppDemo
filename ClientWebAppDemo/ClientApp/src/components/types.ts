export type Category = {
    categoryId: number,
    name: string
}

export type Subcategory = {
    subcategoryId: number,
    name: string
}

export type Contact = {
    contactId: number,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    password: string | null,
    category: Category | null,
    categoryId: number | null,
    subcategory: Subcategory | null,
    subcategoryId: number | null,
    customSubcategory: string | null,
    phoneNumber: string | null,
    birthday: string | null
}

export type UsernameRes = {
    username: string,
    loggedIn: boolean
}
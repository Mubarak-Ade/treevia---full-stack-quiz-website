interface Login {
    email:  string,
    password: string
}

interface Register extends Login {
    username: string
}

interface User {
    id: string,
    email: string,
    username: string,
    role: string
}
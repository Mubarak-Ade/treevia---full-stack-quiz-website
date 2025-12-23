interface Login {
    email:  string,
    password: string
}

interface Register extends Login {
    username: string
}

interface User extends Login {
    role: string
}
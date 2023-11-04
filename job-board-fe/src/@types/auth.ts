export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    accessToken: string
    tokenType: string
}

export type UsersMeResponse = {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    appliedJobs: {
        id: number
        name: string
        description: string
    }[]
    authorities: {
        authority: string
    }[]
}

export type SignUpResponse = {
    success: boolean
    message: string
}

export type SignUpCredential = {
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

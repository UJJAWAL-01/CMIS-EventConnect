export interface User {
    id: string;
    username: string;
    password: string;
    role: Role;
}

export interface Student extends User {
    major: string;
    year: number;
}

export interface Instructor extends User {
    department: string;
}

export interface Judge extends User {
    expertise: string;
}

export interface Role {
    id: string;
    name: string;
    permissions: string[];
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
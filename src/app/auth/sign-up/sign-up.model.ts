export interface Organization {
    id: string;
    title: string;
    users: User[];
};

export interface User {
    id: string;
    userName: string;
    phoneNumber: number;
    address: string;
    email: string;
    password: string;
    isAdmin: boolean;
};

export interface SignUpForm extends Exclude<User, 'id'> {
    orgName: string;
};
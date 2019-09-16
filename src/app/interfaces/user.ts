export interface User {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    emails: Email[];
    name: string;
    role: string;
    created_by: string;
    active: boolean;
    last_login: {
        location: string,
        ip: string,
        date: Date
    };
    signup: {
        location: string,
        ip: string
    };
}
interface Email {
    createdAt: string;
    email: string;
    is_primary: boolean;
    updatedAt: string;
    verification: boolean;
    _id: string;
}

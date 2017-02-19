export class User {
    $key?: string;
    email: string;
    name: string;
    username: string;
    about: string;
    avatar?: string;
    feed?:string[];
    password?: string;
    followers?: string[];
    following?:string[];
}
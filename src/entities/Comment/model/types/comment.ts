import { User } from 'entities/User';

export interface AppComment {
    id: string;
    user: User;
    text: string;
}

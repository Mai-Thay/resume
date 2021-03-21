/**
 * @packageDocumentation
 * @module Models
 */
/**
 * ## Пользователь
 * [[include:7.md]]
 */
export class User {
    id: number;
    username: string;
    role: string;
    token?: string;
}

import type { LoginData } from './types/carelink.js';
export declare const LOGINDATA_FILE: string;
export declare function login(isUS: boolean, username?: string, password?: string): Promise<LoginData>;

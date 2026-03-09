import type { LoginData } from '../types/carelink.js';
export declare function loadLoginData(filePath: string): LoginData | null;
export declare function saveLoginData(filePath: string, data: LoginData): void;
export declare function isTokenExpired(accessToken: string): boolean;
export declare function refreshToken(loginData: LoginData): Promise<LoginData>;

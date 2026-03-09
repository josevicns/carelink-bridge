import type { Agent } from 'node:http';
export interface Proxy {
    ip: string;
    port: string;
    protocols: string[];
    username?: string;
    password?: string;
}
export declare function loadProxyList(filePath: string): Proxy[];
export declare function createProxyAgent(proxy: Proxy): Agent | null;
export declare class ProxyRotator {
    private proxies;
    private currentIndex;
    private retryCount;
    private maxRetries;
    constructor(proxies: Proxy[], maxRetries?: number);
    get hasProxies(): boolean;
    getNext(): Proxy | null;
    tryNext(): Proxy | null;
    resetRetries(): void;
}

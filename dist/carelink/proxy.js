import fs from 'node:fs';
import path from 'node:path';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
export function loadProxyList(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log('[Proxy] Proxy file not found at:', filePath);
            return [];
        }
        const lines = fs.readFileSync(filePath, 'utf8').split('\n').filter(l => l.trim());
        const proxies = lines
            .map(line => {
            const parts = line.trim().split(':');
            return { ip: parts[0], port: parts[1], protocols: ['http'] };
        })
            .filter(p => p.ip && p.port);
        console.log(`[Proxy] Loaded ${proxies.length} proxies from ${path.basename(filePath)}`);
        return proxies;
    }
    catch (e) {
        console.log('[Proxy] Failed to load proxy list:', e.message);
        return [];
    }
}
export function createProxyAgent(proxy) {
    try {
        const protocol = proxy.protocols[0];
        const auth = proxy.username && proxy.password
            ? `${proxy.username}:${proxy.password}@`
            : '';
        if (protocol === 'http' || protocol === 'https') {
            return new HttpsProxyAgent(`http://${auth}${proxy.ip}:${proxy.port}`);
        }
        else if (protocol === 'socks4' || protocol === 'socks5') {
            return new SocksProxyAgent(`${protocol}://${auth}${proxy.ip}:${proxy.port}`);
        }
    }
    catch (e) {
        console.log('[Proxy] Failed to create proxy agent:', e.message);
    }
    return null;
}
export class ProxyRotator {
    proxies;
    currentIndex = 0;
    retryCount = 0;
    maxRetries;
    constructor(proxies, maxRetries = 10) {
        this.proxies = proxies;
        this.maxRetries = maxRetries;
    }
    get hasProxies() {
        return this.proxies.length > 0;
    }
    getNext() {
        if (this.proxies.length === 0)
            return null;
        const proxy = this.proxies[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.proxies.length;
        return proxy;
    }
    tryNext() {
        if (this.proxies.length === 0) {
            console.log('[Proxy] No proxies available');
            return null;
        }
        this.retryCount++;
        if (this.retryCount > this.maxRetries) {
            console.log(`[Proxy] Max proxy retries (${this.maxRetries}) reached`);
            return null;
        }
        return this.getNext();
    }
    resetRetries() {
        this.retryCount = 0;
    }
}
//# sourceMappingURL=proxy.js.map
export interface CareLinkUrls {
    me: string;
    countrySettings: string;
    connectData: (timestamp: number) => string;
    monitorData: string;
    linkedPatients: string;
}
export declare function resolveServerName(server?: string, serverName?: string): string;
export declare function buildUrls(serverName: string, countryCode: string, lang: string): CareLinkUrls;

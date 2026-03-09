import type { CareLinkData } from '../types/carelink.js';
export interface CareLinkClientOptions {
    username: string;
    password: string;
    server?: string;
    serverName?: string;
    countryCode?: string;
    lang?: string;
    patientId?: string;
    maxRetryDuration?: number;
}
export declare class CareLinkClient {
    private axiosInstance;
    private proxyRotator;
    private urls;
    private loginDataPath;
    private serverName;
    private options;
    private requestCount;
    constructor(options: CareLinkClientOptions);
    private applyProxy;
    private authenticate;
    private getCurrentRole;
    private getConnectData;
    private fetchAsCarepartner;
    private isBleDevice;
    private fetchBleDeviceData;
    private fetchAsPatient;
    fetch(): Promise<CareLinkData>;
}

import fs from 'node:fs';
import axios from 'axios';
import qs from 'qs';
export function loadLoginData(filePath) {
    try {
        if (!fs.existsSync(filePath))
            return null;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const required = ['access_token', 'refresh_token', 'client_id', 'token_url'];
        for (const field of required) {
            if (!data[field]) {
                console.log('[Token] logindata.json missing field: ' + field);
                return null;
            }
        }
        return data;
    }
    catch (e) {
        console.log('[Token] Failed to read logindata.json:', e.message);
        return null;
    }
}
export function saveLoginData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}
export function isTokenExpired(accessToken) {
    try {
        const parts = accessToken.split('.');
        if (parts.length !== 3)
            return true;
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
        if (!payload.exp)
            return true;
        // Expired if less than 1 minute remaining
        return payload.exp * 1000 < Date.now() + 60 * 1000;
    }
    catch (e) {
        console.log('[Token] Failed to decode JWT:', e.message);
        return true;
    }
}
export async function refreshToken(loginData) {
    console.log('[Token] Refreshing access token...');
    const resp = await axios.post(loginData.token_url, qs.stringify({
        grant_type: 'refresh_token',
        client_id: loginData.client_id,
        refresh_token: loginData.refresh_token,
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    loginData.access_token = resp.data.access_token;
    if (resp.data.refresh_token) {
        loginData.refresh_token = resp.data.refresh_token;
    }
    console.log('[Token] Token refreshed successfully');
    return loginData;
}
//# sourceMappingURL=token.js.map
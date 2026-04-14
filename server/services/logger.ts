/* tslint:disable:no-console */
const MAX_ERROR_LOG_SIZE = 1000;
let errorLogCache: Array<{ timestamp: string; message: any }> = [];

export function error(message?: any, ...optionalParams: any[]): void {
    // Always write to stderr (captured by systemd journal when running as a service)
    console.error(message, ...optionalParams);

    // Keep a bounded in-memory buffer for the /api/log endpoint
    if (errorLogCache.length >= MAX_ERROR_LOG_SIZE) {
        errorLogCache.shift();
    }
    errorLogCache.push({
        timestamp: new Date().toISOString(),
        message: message instanceof Error ? { name: message.name, message: message.message } : message
    });
}

export function getErrorLog(): Array<{ timestamp: string; message: any }> {
    return [...errorLogCache];
}

export function clearErrorLog(): void {
    errorLogCache = [];
}

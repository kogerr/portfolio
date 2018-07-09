let errorLogCache = [];

export function error(message?: any, ...optionalParams: any[]): void {
    errorLogCache.push(message);
    console.error(message, optionalParams);
}

export function getErrorLog(): Array<any> {
    return errorLogCache;
}

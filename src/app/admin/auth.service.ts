import { Injectable } from '@angular/core';
import { AdminDataService } from './data.service';
import * as decode from 'jwt-decode';

@Injectable()
export class AuthService {

    constructor(private dataService: AdminDataService) { }

    redirectUrl: string;

    login(email: string, password: string): Promise<{ 'success': boolean, error?: any }> {
        return new Promise((resolve, reject) => {
            this.dataService.login(email, password).subscribe(res => {
                if (res.success) {
                    this.setSession(res.token);
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, err => resolve({ success: false, error: err }));
        });
    }

    private setSession(token: string): void {
        let decodedToken: DecodedToken = decode(token);
        let expiresAt = decodedToken.exp * 1000;

        localStorage.setItem('id_token', token);
        localStorage.setItem('expires_at', expiresAt.toString());
        localStorage.setItem('email_address', decodedToken.sub);
    }

    logout(): void {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn(): boolean {
        return Date.now() < this.getExpiration();
    }

    getExpiration(): number {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return expiresAt;
    }

    getToken(): string {
        return localStorage.getItem('id_token');
    }
}

interface DecodedToken {
    iat: number;
    exp: number;
    sub: string;
}

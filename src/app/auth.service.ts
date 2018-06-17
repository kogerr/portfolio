import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as decode from 'jwt-decode';

@Injectable()
export class AuthService {

    constructor(private dataService: DataService) { }

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
        let expiresIn = (decode(token) as { expiresIn: number }).expiresIn;
        let expiresAt = new Date(Date.now() + expiresIn * 60000);

        localStorage.setItem('id_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout(): void {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn(): boolean {
        return this.getToken() && Date.now() < this.getExpiration().valueOf();
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration(): Date {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = new Date(JSON.parse(expiration));
        return expiresAt;
    }

    getToken(): string {
        return localStorage.getItem('id_token');
    }
}

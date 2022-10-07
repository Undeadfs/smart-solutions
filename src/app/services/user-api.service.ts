import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/sign-up/sign-up.model';

@Injectable()

export class UserApi {

    private baseUrl: string = 'http://localhost:3000'
        
    constructor(private http: HttpClient) { }

    createUser(user: User){
        const url = `${this.baseUrl}/users`;
        return this.http.post(url, user)
    }

    getUser() {
        const url = `${this.baseUrl}/users`;
        return this.http.get<User[]>(url)
    }

    getUserById(id: string) {
        const url = `${this.baseUrl}/users/${id}`;
        return this.http.get<User>(url);
    }
}
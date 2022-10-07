import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../auth/sign-up/sign-up.model';

@Injectable()

export class OrganizationApi {

    private baseUrl: string = 'http://localhost:3000'
        
    constructor(private http: HttpClient) { }

    createOrganization(organization: string){
        const url = `${this.baseUrl}/organizations`
        return this.http.post<Organization>(url, {title: organization, users: []})
    }

    getOrganization(id: string) {
        const url = `${this.baseUrl}/organizations/${id}`;
        return this.http.get<Organization>(url);
    }

    updateOrganization(id: string, org: Organization) {
        const url = `${this.baseUrl}/organizations/${id}`;
        return this.http.put(url, org);
    }
}
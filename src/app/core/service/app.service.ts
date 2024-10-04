import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DecouplingConfig } from "../../model/Constant";

@Injectable({providedIn:'root'})

export class AppService {
    constructor(private http: HttpClient){}
    apiURL = "API_URL"; // Update it with your real Web API

    // Get User by UserID
    getUser(userId: string): Observable<any>{
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/users/${userId}`;
            return this.http.get(decoupledURL);
        }
        else{
            // Logic for coupled data
            return this.http.get(this.apiURL);
        }
    }

    // Get All Users
    getUsers(): Observable<any>{
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/users`;
            return this.http.get(decoupledURL);
        }
        else{
            // HTTP request for coupled data
            return this.http.get(this.apiURL);
        }
    }

    // Get All States
    getStates(): Observable<any>{
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/states`;
            return this.http.get(decoupledURL);
        }else{
            // HTTP request for coupled data
            return this.http.get(this.apiURL);
        }
    }

    // Save User Details
    saveUser(user: any): Observable<any>{
        const headers = { 'content-type': 'application/json' }
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/users`;
            return this.http.post(decoupledURL, user, {'headers': headers});
        }else {
            // HTTP request for coupled data
            return this.http.post(this.apiURL, user, {'headers': headers});
        }
    }

    // Delete User Details
    deleteUser(userId: string): Observable<any>{
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/users/${userId}`;
            return this.http.delete(decoupledURL);
        }else {
            // HTTP request for coupled data
            return this.http.delete(this.apiURL);
        }
    }

    // Update User Details
    updateUser(user: any, userId: string): Observable<any>{
        if(DecouplingConfig.data_Decoupling_Enabled){
            // HTTP request for decoupled data
            const decoupledURL = `${DecouplingConfig.baseURL}/users/${userId}`;
            return this.http.put(decoupledURL, user);
        }else{
            // HTTP request for coupled data
            return this.http.put(this.apiURL, user);
        }
    }
}
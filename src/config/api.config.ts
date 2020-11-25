import { HttpHeaders } from '@angular/common/http';

export const API_CONFIG ={
    baseUrl:"http://localhost:8080",

    httpOptions: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
}
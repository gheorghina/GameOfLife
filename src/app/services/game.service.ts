
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {

    constructor(private http: HttpClient) { }

    public getGosperGliderGunContent(){

        console.log('calling service..');

        return this.http.get('http://localhost:4000/cells');
    }

    private getHeaders() {
        let headers: Headers = new Headers();
        headers.append('content-type', 'application/json');
        return headers;
    }
}
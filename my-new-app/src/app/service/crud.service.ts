import { Injectable } from '@angular/core';
import { Incident } from './Incident';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  // REST_API: string = 'http://localhost:8000/api';
  REST_API: string = 'https://bmw-z4.azurewebsites.net/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // Add an Incident
  AddIncident(data: Incident): Observable<any> {
    let API_URL = `${this.REST_API}/add-incident`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Get all Incidents
  GetIncidents() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  // Get single Incident
  GetIncident(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-incident/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //Get single user
  GetUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

// Get incident Log
GetIncidentLog(id: any): Observable<any> {
  let API_URL = `${this.REST_API}/read-incident-Log/${id}`;
  console.log(API_URL)
  return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.handleError)
  );
}

  // Update Incident
  updateIncident(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-incident/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

    // Update User
    updateUser(id: any, data: any): Observable<any> {
      let API_URL = `${this.REST_API}/update-user/${id}`;
      return this.httpClient
        .put(API_URL, data, { headers: this.httpHeaders })
        .pipe(catchError(this.handleError));
    }
    
  // Delete Incident
  deleteIncident(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-incident/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

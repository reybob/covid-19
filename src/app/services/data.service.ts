import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalData } from '../entities/total-data';
import { Reports } from '../entities/reports';
import { AutonomousCommunities } from '../entities/autonomous-communities';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://covid-19-spain-api.herokuapp.com/';

  getHistory(): Observable <TotalData> {
    return this.http.get<TotalData>(this.baseUrl + 'accumulated-values');
  }

  getReports(): Observable <Reports> {
    return this.http.get<Reports>(this.baseUrl + 'reports?sortField=timestamp&sortOrder=asc&limit=60');
  }

  getAutonomousCommunities(): Observable <AutonomousCommunities> {
    return this.http.get<AutonomousCommunities>(this.baseUrl + 'autonomous-communities');
  }
}

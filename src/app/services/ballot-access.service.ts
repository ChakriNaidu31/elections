import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Region } from '../models/region';
import { ToastrService } from 'ngx-toastr';
import { Constituency } from '../models/constituency';

@Injectable({
  providedIn: 'root'
})
export class BallotAccessService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _toastr: ToastrService) { }

  private getHttpHeaders(): HttpHeaders {
    const sessionToken = this.getTokenFromSession();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': sessionToken
    });
  }

  getTokenFromSession(): string {
    return sessionStorage.getItem('brToken') || '';
  }

  getRolesFromSession(): string[] {
    return JSON.parse(sessionStorage.getItem('brPermissions') || '[]');
  }

  private clearSessionToken(): void {
    sessionStorage.removeItem('brToken');
  }

  private clearSessionRoles(): void {
    sessionStorage.removeItem('brPermissions');
  }

  setSessionToken(sessionToken: string) {
    sessionStorage.setItem('brToken', sessionToken);
  }

  setSessionRoles(roles: string[]) {
    sessionStorage.setItem('brPermissions', JSON.stringify(roles));
  }

  canUpdateResults(): boolean {
    const rolesInSession: string[] = this.getRolesFromSession();
    if (rolesInSession.length > 0) {
      return rolesInSession.indexOf(`RESULT: write`) > -1;
    } else {
      return false;
    }
  }

  /******************* METHODS BEGIN ************************/
  loginUser(username: string, password: string) {
    return this.http.post(this.apiUrl + '/user/login', { username, password }, { headers: this.getHttpHeaders() });
  }

  logoutUser() {
    this.clearSessionToken();
    this.clearSessionRoles();
    return this.http.post(this.apiUrl + '/user/logout', {}, { headers: this.getHttpHeaders() });
  }

  setPassword(plainPassword: string, token: string) {
    return this.http.post(this.apiUrl + '/user/setPassword', { password: plainPassword }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  getUserAccess() {
    return this.http.get(this.apiUrl + '/user/access', { headers: this.getHttpHeaders() });
  }

  // Region APIs
  getRegionList() {
    return this.http.get(this.apiUrl + '/region', { headers: this.getHttpHeaders() });
  }
  getRegionById(id: string) {
    return this.http.get(this.apiUrl + '/region/' + id, { headers: this.getHttpHeaders() });
  }
  createRegion(region: Region) {
    return this.http.post(this.apiUrl + '/region', region, { headers: this.getHttpHeaders() });
  }
  updateRegion(id: string, region: Region) {
    return this.http.patch(this.apiUrl + '/region/' + id, region, { headers: this.getHttpHeaders() });
  }
  deleteRegion(id: string) {
    return this.http.delete(this.apiUrl + '/region/' + id, { headers: this.getHttpHeaders() });
  }

  // Constituency APIs
  getConstituencyList() {
    return this.http.get(this.apiUrl + '/constituency', { headers: this.getHttpHeaders() });
  }
  getConstituencyById(id: string) {
    return this.http.get(this.apiUrl + '/constituency/' + id, { headers: this.getHttpHeaders() });
  }
  createConstituency(constituency: Constituency) {
    return this.http.post(this.apiUrl + '/constituency', constituency, { headers: this.getHttpHeaders() });
  }
  updateConstituency(id: string, constituency: Constituency) {
    return this.http.patch(this.apiUrl + '/constituency/' + id, constituency, { headers: this.getHttpHeaders() });
  }
  deleteConstituency(id: string) {
    return this.http.delete(this.apiUrl + '/constituency/' + id, { headers: this.getHttpHeaders() });
  }

  // Ward APIs
  getWardList() {
    return this.http.get(this.apiUrl + '/ward', { headers: this.getHttpHeaders() });
  }
  getWardById(id: string) {
    return this.http.get(this.apiUrl + '/ward/' + id, { headers: this.getHttpHeaders() });
  }
  createWard(ward: any) {
    return this.http.post(this.apiUrl + '/ward', ward, { headers: this.getHttpHeaders() });
  }
  updateWard(id: string, ward: any) {
    return this.http.patch(this.apiUrl + '/ward/' + id, ward, { headers: this.getHttpHeaders() });
  }
  deleteWard(id: string) {
    return this.http.delete(this.apiUrl + '/ward/' + id, { headers: this.getHttpHeaders() });
  }

  // Polling station APIs
  getPollingStationList() {
    return this.http.get(this.apiUrl + '/station', { headers: this.getHttpHeaders() });
  }
  getPollingStationById(id: string) {
    return this.http.get(this.apiUrl + '/station/' + id, { headers: this.getHttpHeaders() });
  }
  createPollingStation(pollingStation: any) {
    return this.http.post(this.apiUrl + '/station', pollingStation, { headers: this.getHttpHeaders() });
  }
  updatePollingStation(id: string, pollingStation: any) {
    return this.http.patch(this.apiUrl + '/station/' + id, pollingStation, { headers: this.getHttpHeaders() });
  }
  deletePollingStation(id: string) {
    return this.http.delete(this.apiUrl + '/station/' + id, { headers: this.getHttpHeaders() });
  }

  // Election APIs
  getElectionList() {
    return this.http.get(this.apiUrl + '/election', { headers: this.getHttpHeaders() });
  }
  getElectionDetails(id: string) {
    return this.http.get(this.apiUrl + '/election/' + id, { headers: this.getHttpHeaders() });
  }
  createElection(election: any) {
    return this.http.post(this.apiUrl + '/election', election, { headers: this.getHttpHeaders() });
  }
  updateElection(id: string, election: any) {
    return this.http.patch(this.apiUrl + '/election/' + id, election, { headers: this.getHttpHeaders() });
  }
  activateElection(id: string) {
    return this.http.post(this.apiUrl + '/election/activate/' + id, {}, { headers: this.getHttpHeaders() });
  }
  getCurrentElectionDetails() {
    return this.http.post(this.apiUrl + '/election/current', {}, { headers: this.getHttpHeaders() });
  }

  // User APIs - TODO: Some of the below methods are unused
  getUserList() {
    return this.http.get(this.apiUrl + '/user', { headers: this.getHttpHeaders() });
  }
  createUser(user: any) {
    return this.http.post(this.apiUrl + '/user', user, { headers: this.getHttpHeaders() });
  }
  createAdminUser(user: any) {
    return this.http.post(this.apiUrl + '/user/createAdmin', user, { headers: this.getHttpHeaders() });
  }
  deactivateUser(id: string) {
    return this.http.delete(this.apiUrl + '/user/' + id, { headers: this.getHttpHeaders() });
  }
  getUserDetails(id: string) {
    return this.http.get(this.apiUrl + '/user/single/' + id, { headers: this.getHttpHeaders() });
  }

  // Poll APIs
  saveDetailsBeforePoll(details: any) {
    return this.http.post(this.apiUrl + '/poll/before', details, { headers: this.getHttpHeaders() });
  }
  saveDetailsAtPoll(details: any) {
    return this.http.post(this.apiUrl + '/poll/at', details, { headers: this.getHttpHeaders() });
  }
  saveDetailsAfterPoll(details: any) {
    return this.http.post(this.apiUrl + '/poll/after', details, { headers: this.getHttpHeaders() });
  }
  getDetailsBeforePoll() {
    return this.http.get(this.apiUrl + '/poll/before', { headers: this.getHttpHeaders() });
  }
  getDetailsAtPoll() {
    return this.http.get(this.apiUrl + '/poll/at', { headers: this.getHttpHeaders() });
  }
  getDetailsAfterPoll() {
    return this.http.get(this.apiUrl + '/poll/after', { headers: this.getHttpHeaders() });
  }

  // Result APIs
  addResult(result: any) {
    return this.http.post(this.apiUrl + '/result', result, { headers: this.getHttpHeaders() });
  }
  getResult(regionId: string = '', constituencyId: string = '', stationId: string = '') {
    return this.http.get(`${this.apiUrl}/result?region=${regionId}&constituency=${constituencyId}&station=${stationId}`, { headers: this.getHttpHeaders() });
  }

  // Dashboard API
  fetchDashboard() {
    return this.http.get(this.apiUrl + '/dashboard', { headers: this.getHttpHeaders() });
  }
  fetchStats() {
    return this.http.get(this.apiUrl + '/dashboard/stats', { headers: this.getHttpHeaders() });
  }

  /******************* METHODS END ************************/


  /********************* TOASTER MESSAGES ******************/

  showSuccess(title: string, message: string) {
    this._toastr.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });
  }

  showError(message: string) {
    this._toastr.error(message, 'Error', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: false,
      progressBar: false
    });
  }

  showInfo(title: string, message: string) {
    this._toastr.info(message, title);
  }
  /********************* TOASTER MESSAGES ******************/

}

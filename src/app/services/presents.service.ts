import { Injectable } from '@angular/core';
import { Present } from '../models/present.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { QueryParamsHandling } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PresentService {
  private callToGetPresentSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetPresent$: Observable<boolean> = this.callToGetPresentSubject.asObservable();

  constructor(private http: HttpClient) { }

  setGetPresent() {
    let flag = this.callToGetPresentSubject.value;
    this.callToGetPresentSubject.next(!flag);
  }


  getPresente(): Observable<Present[]> {

    let url = 'https://localhost:7119/api/Present';
    return this.http.get<Present[]>(url)
  }

  getById(id: number): Observable<Present> {
    let url = 'https://localhost:7119/api/Present/' + id
    return this.http.get<Present>(url);
  }

  addPresrent(p: Present) {
    let url = 'https://localhost:7119/api/Present';
    return this.http.post(url, p)
  }

  updatePresent(p: Present) {
    let url = 'https://localhost:7119/api/Present/' + p.id;
    return this.http.put(url, p)
  }

  deletePresnt(id: number) {
    let url = `https://localhost:7119/api/Present/${id}`
    return this.http.delete<boolean>(url);
  }

  deletePresentsSelect(selectedPresents: Present[]) {
    let url = `https://localhost:7119/api/Present?`;
    for (let i = 0; i < selectedPresents.length; i++) {
      url += `presents=${selectedPresents[i].id}`
      i != selectedPresents.length - 1 && (url += '&');
    } return this.http.delete<boolean>(url);
  }


}


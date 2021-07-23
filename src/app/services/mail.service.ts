import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendCocaForm(nombre: string, email: string, whatsapp: string,
    servicio: string, mensaje: string): Observable<any> {
return this.http.get(environment.emailURL,
{ responseType: 'text', params: { nombre, email, whatsapp, servicio, mensaje}} );
}

sendCocaWorkForm(nombre: string, email: string, whatsapp: string,
  mensaje: string): Observable<any> {
return this.http.get(environment.trabajoURL,
{ responseType: 'text', params: { nombre, email, whatsapp, mensaje}} );
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(
    private http: HttpClient
  ) { }


  // La función 'of', sirve para crear observables en base
  // al argumento que le damos

  // La función map, sirve para transformar lo que sea que se 
  // reciba del operador anterior o observable, y transformarlo,
  // y a su vez, retonar un nuevo valor. igual que la función map de arreglos
  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('token') ) { 
      return of(false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
                    .pipe(
                      map( auth => {
                        this._auth = auth;
                        return true;
                      })
                    );
    //return of(true);
  }

  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
                    .pipe(
                      tap( auth => this._auth = auth),
                      tap( auth => localStorage.setItem( 'token', auth.id ))
                    )
  }

  logout() {
    this._auth = undefined;
  }
}

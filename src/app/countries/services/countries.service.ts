import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiurl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  serachCountryAlphaCode( code: string ): Observable<Country | null>{
    const url = `${ this.apiurl }/alpha/${ code }`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( error => of(null)) //of([]) si encuentra error regresa obserbable bacio
    );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiurl }/capital/${ term }`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( error => of([])) //of([]) si encuentra error regresa obserbable bacio
    );
  }

  searchCountry( term: string ): Observable<Country[]>{
    const url = `${ this.apiurl }/name/${ term }`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( error => of([])) //of([]) si encuentra error regresa obserbable bacio
    );
  }

  searchRegion( region: string ): Observable<Country[]>{
    const url = `${ this.apiurl }/region/${ region }`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( error => of([])) //of([]) si encuentra error regresa obserbable bacio
    );
  }
}

import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import 'rxjs/add/operator/toPromise';
import { Http } from "@angular/http";

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: Http) { }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(resp => resp.json().data as Hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get("/api/heroes")
      .toPromise()
      .then(resp => resp.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
}

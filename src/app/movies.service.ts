import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesResponse: any;
  detailResponse: any;

  constructor(private http: HttpClient) { }

  getMovies(name) {
    let url = `http://www.omdbapi.com/?s=${name}&apikey=`;
    return this.http.get(url);
  }

  getMovieDetail(name) {
    let url = `http://www.omdbapi.com/?t=${name}&apikey=`;
    return this.http.get(url);
  }

  getUsers() {
    return this.http.get('https://whatnext-d6110.firebaseio.com/signup.json');
  }

}

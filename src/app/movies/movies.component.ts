import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movieData: Object;
  currentData;

  constructor(private Movies: MoviesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.Movies.getMovieDetail(params.name).subscribe(res => {
        this.movieData = res;
        this.currentData = res['imdbRating'];
      });
    });
  }

}

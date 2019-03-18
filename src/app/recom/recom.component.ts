import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recom',
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      Swal.fire('Oops...', "You're not logged in!", 'error');
      this.router.navigate(['/login']);
    }
  }

}

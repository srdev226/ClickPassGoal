import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './loader.scss'],
  animations: [
    trigger('Animation1', [
      transition('* => *', group([

        query(
          ':leave',
          [style({ 'margin-top': '0%' }), animate('0.3s', style({ 'margin-top': '100%' }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ 'margin-top': '-100%' }), animate('0.3s', style({ 'margin-top': '0%' }))],
          { optional: true }
        ),
      ])),
    ]), 
    trigger('Animation2', [
      transition('* => *', group([

        query(
          ':leave',
          [style({ 'opacity': '1' }), animate('0.3s', style({ 'opacity': '0' }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ 'opacity': '0' }), animate('0.3s', style({ 'opacity': '1' }))],
          { optional: true }
        ),
      ])),
    ]), 
  ]
})
export class AppComponent {
  title = 'cpg';
  filterData: FormGroup;
  
  constructor(private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onFilter(filterData) {
    console.log(filterData.value);
    this.router.navigate(['/user-lists/', filterData.value]);
  }
}

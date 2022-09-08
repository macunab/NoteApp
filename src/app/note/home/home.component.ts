import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader, slider } from '../route-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    a {
      text-decoration: none;
      color: #5A5060;
    }

    .side {
      min-width: 300px;
    }

    .cat-menu {
      min-width: 300px;
    }

    .side-title {
      margin-top: 20px;
    }

    .text-pastel-green {
      color: #FFB7B2;
    }

    .icon-color {
      color: #5A5060;
    }
    `
  ],
  animations: [
    slider
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute( outlet: RouterOutlet ) {
    //return (outlet.isActivated ? outlet.activatedRoute : '');
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

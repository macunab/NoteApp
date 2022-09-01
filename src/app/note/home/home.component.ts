import { Component, OnInit } from '@angular/core';

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
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from 'src/app/authentication/interfaces/interfaces';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { slider } from '../route-animation';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/interfaces';

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

  user!: User;
  categories: Array<Category> =[];

  constructor(private authService: AuthService, private router: Router,
      private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.categoryService.getAllCategories()
      .subscribe(res => {
        this.categories = res;
      })
  }

  logout() {
    this.authService.logout();
  }


  prepareRoute( outlet: RouterOutlet ) {
    //return (outlet.isActivated ? outlet.activatedRoute : '');
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

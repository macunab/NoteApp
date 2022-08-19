import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  defaultColor: string = 'note-grey';
  redColor: string = 'note-red';

  constructor() { }

  ngOnInit(): void {
  }

  selectNote(){
    console.log(`The note selected is: 100`);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-showcase',
  imports: [],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {
  a = [1 , 2 , 3 , 4 , 5];
  show(){
    console.log("hello");
  }
  sachin = "Sachin";
}

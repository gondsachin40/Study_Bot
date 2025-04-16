import { Component } from '@angular/core';
import { DATA } from '../data/info'
import ollama from 'ollama';
@Component({
  selector: 'app-read',
  imports: [],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent {
  title = 'my-app';
  ans = "Enter any topic you want to study";
}

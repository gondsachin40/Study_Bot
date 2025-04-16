import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from "./quiz/quiz.component";
import { ReadingComponent } from './reading/reading.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { DATA } from './data/info';
import ollama from 'ollama';
import { IMCQ, McqService } from './service/mcq.service';
import { FrontComponent } from "./front/front.component";
import { PDFMAKERComponent } from './pdfmaker/pdfmaker.component';



@Component({
  selector: 'app-root',
  imports: [QuizComponent, ReadingComponent, FrontComponent, PDFMAKERComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

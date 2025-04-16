import { Component, OnInit } from '@angular/core';
// import { MCQ } from '../data/mcq'
import { IMCQ, McqService } from '../service/mcq.service';
import { PDFMAKERComponent } from '../pdfmaker/pdfmaker.component';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports: [PDFMAKERComponent],
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  Question = "What are Sachin's Skills?";
  ind = 0;
  p1 = 0;
  p2 = 0;
  p3 = 0;
  p4 = 0;
  p: IMCQ | undefined;
  op1 = "Gaming";
  op2 = "CP";
  op3 = "Development";
  op4 = "All of the above";
  correct = 4;
  over = -1;
  flag = true;
  score = 0;
  len = 0;
  MCQ: IMCQ[] = []
  constructor(private mcqService: McqService) {}

  ngOnInit(): void {
      this.mcqService.getMCQ().subscribe({
        next: (MCQData) => {
          
          // console.log('MCQData', JSON.stringify(MCQData))
          console.log('MCQData in component', MCQData)
          this.setupMCQ(MCQData)
        },
      })
  }

  setupMCQ(MCQData: IMCQ[]) {
    this.MCQ = MCQData
    console.log(this.MCQ);
    this.p = MCQData[0];
    this.Question = this.p.question;
    this.op1 = this.p.options[0];
    this.op2 = this.p.options[1];
    this.op3 = this.p.options[2];
    this.op4 = this.p.options[3];
    this.correct = this.p.correct_answer + 1;
    this.len = MCQData.length;
    // console.log(this.Question);
    // console.log(this.p.options[this.p.correct_answer]);
  }
  update(){
    this.ind += 1;
    if(this.ind >= this.MCQ.length){
      this.flag = false;
      return;
      
    }
    this.over = -1;
    this.p = this.MCQ[this.ind];
    if(this.p) {
      this.Question = this.p.question
      this.op1 = this.p.options[0];
      this.op2 = this.p.options[1];
      this.op3 = this.p.options[2];
      this.op4 = this.p.options[3];
      this.correct = this.p.correct_answer + 1;
      console.log(this.Question);
      console.log(this.p.options[this.p.correct_answer]);
    }
  }
  checkAns(curr: number) {
    this.over = 1; 
    this.p1 = 0;
    this.p2 = 0;
    this.p3 = 0;
    this.p4 = 0;
    if (curr === this.correct) {
      this.score += 1;
      if (curr === 1) this.p1 = 1;
      else if (curr === 2) this.p2 = 1;
      else if (curr === 3) this.p3 = 1;
      else if (curr === 4) this.p4 = 1;
    } else {
      if (curr === 1) this.p1 = -1;
      else if (curr === 2) this.p2 = -1;
      else if (curr === 3) this.p3 = -1;
      else if (curr === 4) this.p4 = -1;
    }
  }
}

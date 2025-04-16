import { Component } from '@angular/core';
import { IMCQ, McqService } from '../service/mcq.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-pdfmaker',
  imports: [],
  templateUrl: './pdfmaker.component.html',
  styleUrl: './pdfmaker.component.css'
})
export class PDFMAKERComponent {
  MCQ: IMCQ[] = []
  flag : boolean = true;
  constructor(private mcqService: McqService) {}
  ngOnInit(): void {
    this.mcqService.getMCQ().subscribe({
      next: (MCQData) => {
        this.setupMCQ(MCQData)
        console.log(this.MCQ)
      },
    })
}
DeleteQuestion(index : number){
  
}
change(){
  this.flag = !this.flag;
}
setupMCQ(MCQData: IMCQ[]) {
  this.MCQ = MCQData
  console.log(this.MCQ);
}
generatePDF() {
  console.log(this.MCQ);
  const doc = new jsPDF();
  let y = 20;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  this.MCQ.forEach((q, index) => {
    doc.setFontSize(12);

    // Check if question fits on current page
    if (y + lineHeight * (q.options.length + 2) > pageHeight - 10) {
      doc.addPage();
      y = 20; // Reset y for new page
    }

    doc.text(`${index + 1}) ${q.question}`, 10, y);
    y += 8;

    q.options.forEach((opt, i) => {
      const optionLabel = String.fromCharCode(97 + i); 
      doc.text(`   ${optionLabel}) ${opt}`, 15, y);
      y += lineHeight;
    });

    y += 5;
  });

  doc.save("MCQ_Questions.pdf");
}

onChange(index: number, optionIndex: number, $event: any) {
  console.log('(index, optionIndex, $event.target.value)', index, optionIndex, $event.target.value)
  this.mcqService.updateMCQOptions(index, optionIndex, $event.target.value)
}
onQuestion(index: number,$event: any) {
  this.mcqService.updateQuestion(index, $event.target.value)
}
}
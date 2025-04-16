import { Component } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ReadingComponent } from '../reading/reading.component';
import { IMCQ, McqService } from '../service/mcq.service';

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [QuizComponent, ReadingComponent],
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent {
  constructor(private mcqService: McqService) {}

  current = "Topic";
  ans = "hello";
  flag = true;
  proceedFlag = false;

  proceed() {
    this.current = "Quiz";
  }

  async call(question: string) {
    console.log('in call');
    console.log('question', question);

    const customPrompt = `
      You are a professional question trainer and assessment creator.
      
      Generate exactly 10 multiple-choice questions (MCQs) on ${question}.
      
      Each question must be in the following strict JSON format (as a list of objects):

      [
        {
          "question": "question on ${question}",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct_answer": index_of_correct_option (0-3)
        },
        ...
      ]

      Important:
      - Only output valid JSON.
      - Each question must have exactly four options.
      - "correct_answer" should be the index (0-3).
      - No additional explanation, formatting, or text.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/optimus-alpha", 
        messages: [
          {
            role: "user",
            content: customPrompt
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const MCQ: IMCQ[] = [];

    try {
      const parsed = JSON.parse(content);
      parsed.forEach((q: IMCQ) => MCQ.push(q));
      this.mcqService.setMCQ(MCQ);
      this.flag = false;
      this.proceedFlag = true;
      console.log('MCQ:', MCQ);
    } catch (e) {
      console.error("Failed to parse JSON:", content);
    }
  }

  async calls(question: string) {
    const customPrompt = `Give me information about ${question} in 80 words.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/optimus-alpha",
        messages: [
          {
            role: "user",
            content: customPrompt
          }
        ]
      })
    });

    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content || '';

    if (content) {
      console.log("Summary:", content);
      this.ans = content.trim();
    }
  }

  ChangeMode() {
    if (this.current === "Topic") {
      this.current = "Read";
    } else {
      this.current = "Topic";
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-reading',
  imports: [],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css'
})
export class ReadingComponent {
  ans = "hello";

  async call(question: string) {
    console.log('in call');
    const customPrompt = `generate 5 questions on ${question}`;
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
    const content = data.choices?.[0]?.message?.content;
    if (content) {
      let t = content;
      this.ans = t;
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMCQ{
  question: string;
  options: string[];
  correct_answer: number;
}
@Injectable({
  providedIn: 'root'
})
export class McqService {
  mcqData: IMCQ[] = [{"question":"What is the purpose of the 'let' keyword in JavaScript?","options":["EHLLLLLLl","To declare a constant","To import a module","To export a function"],"correct_answer":0},{"question":"How do you access an array element in JavaScript?","options":["Using the 'length' property","Using the 'push' method","Using the '[' and ']' characters","Using the 'join' method"],"correct_answer":2},{"question":"What is the difference between '=='' and '===' in JavaScript?","options":["One compares values, the other compares types","One compares strings, the other compares numbers","One is loose equality, the other is strict equality","One compares arrays, the other compares objects"],"correct_answer":2},{"question":"How do you round a number to two decimal places in JavaScript?","options":["Using the 'Math.round' function","Using the 'toFixed' method","Using the 'toPrecision' method","Using the 'toExponential' method"],"correct_answer":1},{"question":"What is the purpose of the 'this' keyword in JavaScript?","options":["To refer to a global variable","To refer to a local variable","To refer to an object instance","To refer to a function"],"correct_answer":2},{"question":"How do you concatenate two strings in JavaScript?","options":["Using the '+' operator","Using the 'concat' method","Using the '*' operator","Using the '/' operator"],"correct_answer":0},{"question":"What is the difference between an array and a set in JavaScript?","options":["An array can contain duplicates, a set cannot","An array must be ordered, a set does not have to be","A set is a collection of unique values, an array is a collection of any type of value","A set must be mutable, an array does not have to be"],"correct_answer":0},{"question":"How do you sort an array in ascending order in JavaScript?","options":["Using the 'sort' method","Using the 'indexOf' method","Using the 'push' method","Using the 'pop' method"],"correct_answer":0},{"question":"What is the purpose of the 'console.log' function in JavaScript?","options":["To print a value to the console","To read user input from the console","To create a new global variable","To exit the program"],"correct_answer":0},{"question":"How do you check if an object has a certain property in JavaScript?","options":["Using the 'in' operator","Using the 'hasOwnProperty' method","Using the 'getOwnPropertyDescriptor' method","Using the 'Object.keys' function"],"correct_answer":0}];
  MCQ = new BehaviorSubject<IMCQ[]>(this.mcqData)
  constructor() { }

  setMCQ(mcq: IMCQ[]) {
    this.mcqData = mcq;
    this.MCQ.next(this.mcqData)
  }

  getMCQ() {
    return this.MCQ.asObservable()
  }

  updateMCQOptions(index: number, optionIndex: number, option: string) {
    const temp = [...this.mcqData]
    temp[index].options[optionIndex] = option
    this.mcqData  = temp;
    this.MCQ.next(this.mcqData)
  } updateQuestion
 (index : number , question : string){
    const temp = [...this.mcqData]
    temp[index].question = question;
    this.mcqData  = temp;
    this.MCQ.next(this.mcqData)
  }
}

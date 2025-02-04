import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {QuestionService } from '../service/question.service';
import{CommonModule}from '@angular/common'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule ,MatStepperModule, MatButtonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})

export class QuestionsComponent implements OnInit{

  public name: string ="";
  public questionList: any = []; 
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 108;
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;
  image: any;
  progress: string = "0";
  isExplanationVisible: boolean = false;
  isQuizCompleted: boolean = false;

constructor( private questionService: QuestionService, private router: Router, private snackBar: MatSnackBar) {}

ngOnInit(): void {
  this.name = localStorage.getItem('name')!;
  this.getAllQuestions();
  this.startCounter();
}
getAllQuestions() {
  this.questionService.getQuestionsJson().subscribe((res) => {
    this.questionList = res.questions.map((question: any) => ({
      ...question,
      isAnswered: false,  }));
  });
}
nextQuestion() {
  if (this.currentQuestion < this.questionList.length - 1) {
    this.currentQuestion++;
  } else {
    this.isQuizCompleted = true;
    this.stopCounter();
}
}
previousQuestion() {  
 this.currentQuestion--;
}
selectOption(currentQno: number, option: any) {
  const currentQuestion = this.questionList[currentQno];
  
  if (currentQuestion.isAnswered) {
    return; 
  }

  currentQuestion.isAnswered = true;
  currentQuestion.options.forEach((opt: any) => (opt.selected = false));
  option.selected = true;

  if (option.correct) {
    this.points += 10;
    this.correctAnswer++;
    this.snackBar.open('✅ ¡Respuesta correcta! Puedes continuar a la siguiente pregunta.', 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  } else {
    this.inCorrectAnswer++;
    
    this.snackBar.open('❌ Respuesta incorrecta. Puedes leer la explicación o reiniciar el juego.', 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    })
  }

  this.getProgressPercent();
}


startCounter() { 
  this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 108;
        this.points -= 10;
      }
    };

stopCounter() {
  this.counter = 0;
}
resetCounter() {
  this.stopCounter();
  this.counter = 108;
  this.startCounter();
}
resetQuiz(){
  this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 0;
    this.currentQuestion = 0;
    this.progress = "0";

}
getProgressPercent() {
  this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
  return this.progress;
}
startQuiz() {
  this.isQuizCompleted = false; 
  this.points = 0; 
  this.correctAnswer = 0; 
  this.inCorrectAnswer = 0; 
  this.currentQuestion = 0; 
  this.getProgressPercent(); 
  this.startCounter(); 
  this.getAllQuestions(); 
}

goToHome() {
  this.router.navigate(['/welcome']); 
}

showExplanation() {
  this.isExplanationVisible = true;
}

closeExplanation() {
  this.isExplanationVisible = false;
}

}

import { Component } from '@angular/core';
import { QuestionsComponent  } from '../questions/questions.component'
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';



@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [QuestionsComponent,CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}


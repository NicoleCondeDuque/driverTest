import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WelcomeComponent  } from './components/welcome/welcome.component'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'driverTest';
}

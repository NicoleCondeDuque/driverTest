import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionsComponent } from './components/questions/questions.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },

    {
        path: 'welcome',
        component: WelcomeComponent 
    },
    {
        path: 'questions',
        component:QuestionsComponent   
    }

];

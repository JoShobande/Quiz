import { Component, signal } from '@angular/core';
import { StartScreen } from './components/start-screen/start-screen';

@Component({
  selector: 'app-root',
  imports: [StartScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('quiz-app');
}

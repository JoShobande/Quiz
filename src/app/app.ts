import { Component, inject, signal } from '@angular/core';
import { StartScreen } from './components/start-screen/start-screen';
import { Quiz } from './services/quiz';
import { QuestionCard } from './components/question-card/question-card';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ResultsScreen } from './components/results-screen/results-screen';

@Component({
  selector: 'app-root',
  imports: [StartScreen, QuestionCard, ResultsScreen, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private quiz = inject(Quiz);

  vm$ = this.quiz.state$.pipe(
    map((state) => {
      return {
        phase: state.phase,
      };
    }),
  );
}

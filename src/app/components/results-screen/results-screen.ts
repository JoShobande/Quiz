import { Component, inject } from '@angular/core';
import { Quiz } from '../../services/quiz';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-results-screen',
  imports: [AsyncPipe],
  templateUrl: './results-screen.html',
  styleUrl: './results-screen.scss',
})
export class ResultsScreen {
  private quiz = inject(Quiz);

  vm$ = this.quiz.state$.pipe(
    map((state) => {
      const answeredQuestions = state.answeredQuestions.map((item, index) => {
        const fullQuestion = state.questions.find((question) => question.id === item.questionId);
        const selectedOption = fullQuestion?.options.find(
          (option) => option.id === item.selectedOptionId,
        );
        const correctOption = fullQuestion?.options.find((option) => option.isCorrect);

        return {
          questionNumber: index + 1,
          questionText: fullQuestion?.text ?? '',
          yourAnswerText: selectedOption?.text ?? 'No answer',
          correctAnswerText: correctOption?.text ?? '',
          wasCorrect: selectedOption?.isCorrect ?? false,
        };
      });

      return {
        score: state.score,
        totalQuestions: state.questions.length,
        answeredQuestions,
      };
    }),
  );

  onClickRestart() {
    this.quiz.resetQuiz();
  }
}

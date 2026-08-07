import { Component, inject } from '@angular/core';
import { Quiz } from '../../services/quiz';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-question-card',
  imports: [AsyncPipe],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
})
export class QuestionCard {
  private quiz = inject(Quiz);

  vm$ = this.quiz.state$.pipe(
    map((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex] ?? null;
      const correctOption = currentQuestion?.options.find((o) => o.isCorrect) ?? null;
      const selectedOption =
        currentQuestion?.options.find((o) => o.id === state.selectedOptionId) ?? null;

      return {
        isAnswered: state.isAnswered,
        selectedOptionId: state.selectedOptionId,
        score: state.score,
        currentQuestion,
        isLastQuestion: state.currentQuestionIndex >= state.questions.length - 1,
        currentQuestionNumber: state.currentQuestionIndex + 1,
        totalQuestions: state.questions.length,
        correctOptionText: correctOption?.text ?? '',
        wasCorrect: selectedOption?.isCorrect ?? false,
      };
    }),
  );

  onSelectAnswer(id: string) {
    this.quiz.selectAnswer(id);
  }

  onSelectNext() {
    this.quiz.nextQuestion();
  }
}

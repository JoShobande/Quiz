import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizState } from '../models/quiz';
import { Question } from '../models/question';

@Service()
export class Quiz {
  private stateSubject = new BehaviorSubject<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedOptionId: null,
    isAnswered: false,
    score: 0,
    answeredQuestions: [],
    phase: 'start',
  });

  startQuiz(questions: Question[]) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      questions,
      phase: 'question',
    });
  }

  selectAnswer(answerId: string) {
    const state = this.stateSubject.value;
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const selectedOption = currentQuestion.options.find((item) => item.id === answerId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    this.stateSubject.next({
      ...state,
      selectedOptionId: answerId,
      isAnswered: true,
      score: isCorrect ? state.score + 1 : state.score,
      answeredQuestions: [
        ...state.answeredQuestions,
        { questionId: currentQuestion.id, selectedOptionId: answerId },
      ],
    });
  }

  nextQuestion() {
    const state = this.stateSubject.value;
    const nextIndex = state.currentQuestionIndex + 1;
    const isLastQuestion = nextIndex >= state.questions.length;

    this.stateSubject.next({
      ...state,
      currentQuestionIndex: nextIndex,
      isAnswered: false,
      selectedOptionId: null,
      phase: isLastQuestion ? 'results' : state.phase,
    });
  }

  state$ = this.stateSubject.asObservable();
}

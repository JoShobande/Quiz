import { AnsweredQuestion, Question } from './question';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedOptionId: string | null;
  isAnswered: boolean;
  score: number;
  answeredQuestions: AnsweredQuestion[];
  phase: 'start' | 'question' | 'results';
}

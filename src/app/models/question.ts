export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerOption[];
}

export interface AnsweredQuestion {
  questionId: string;
  selectedOptionId: string | null;
}

import { Component, inject, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../../services/quiz';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen implements OnInit {
  private http = inject(HttpClient);
  private quiz = inject(Quiz);

  private questions: Question[] = [];
  error: string | null = null;

  ngOnInit() {
    this.http.get<Question[]>('/questions.json').subscribe({
      next: (questions) => {
        this.questions = questions;
      },
      error: (err) => {
        console.error('Failed to load questions', err);
        this.error = 'Could not load questions, Please try again';
      },
    });
  }

  onStartClick() {
    this.quiz.startQuiz(this.questions);
  }
}

# Tech Trivia Quiz App

A browser-based multiple-choice quiz built with Angular. Users start a quiz, answer questions one at a time with immediate red/green feedback, and see a full results breakdown with their final score at the end.

Built as a learning project to pick up Angular fundamentals — standalone components, services, dependency injection, and RxJS-based state management.

## Features

- Start screen with quiz details and a "Start Quiz" button
- Multiple-choice questions presented as cards, one at a time
- Immediate visual feedback on answer selection (green for correct, red for incorrect), with the correct answer revealed
- Running score tracked throughout the quiz
- Progress indicator (question count + progress bar)
- Full results screen at the end: final score, and a per-question breakdown showing what was selected vs. the correct answer
- Restart flow that resets the quiz without re-fetching question data

> **Note:** The spec's optional 1-minute-per-question timer (auto-skip + score decrement) is **not implemented** in the current version.

## Tech Stack

- **Angular** (standalone components, no NgModules)
- **TypeScript**
- **RxJS** — `BehaviorSubject` + `Observable` service pattern for state management (no external state library)
- **HttpClient** — fetches quiz questions from a local JSON file
- **SCSS** — component-scoped styles

## Architecture

### State management

All quiz state lives in a single injectable `Quiz` service (`services/quiz.ts`), following a private-writer / public-reader pattern:

- A private `BehaviorSubject<QuizState>` holds the source of truth.
- `state$` exposes it as a read-only `Observable` — components can only read state, never mutate it directly.
- Derived values (like the current question or whether it's the last one) are computed on the fly via `state$.pipe(map(...))`, rather than stored as separate fields — so they can never drift out of sync with the underlying state.
- All state changes go through explicit methods on the service (`startQuiz`, `selectAnswer`, `nextQuestion`, `resetQuiz`), each replacing the state object immutably via `.next({ ...state, ...changes })`.

Components inject `Quiz` via `inject()`, subscribe to a combined view-model stream (`vm$`) in their template using the `async` pipe, and call the service's methods in response to user actions.

### Data model

Question data is defined in `models/question.ts`:

- `AnswerOption` — a single answer choice (`id`, `text`, `isCorrect`)
- `Question` — a question with its options (`id`, `text`, `options`)
- `AnsweredQuestion` — a lightweight record of what the user selected for a given question (`questionId`, `selectedOptionId`), accumulated as the quiz progresses and later joined back to the full question data to render the results screen

### Screens

| Component       | Responsibility                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `StartScreen`   | Fetches questions from `public/questions.json` on load, shows quiz details, starts the quiz on button click |
| `QuestionCard`  | Renders the current question and options, handles answer selection and advancing to the next question       |
| `ResultsScreen` | Shows final score and a full per-question breakdown, handles restarting the quiz                            |

`App` (the root component) switches between the three screens based on the service's `phase` field (`'start' | 'question' | 'results'`).

## Question Data

Questions are loaded from `public/questions.json` at runtime via `HttpClient`. To change the quiz content, edit that file directly — each question follows the `Question` shape described above.

## Getting Started

```bash
npm install
ng serve
```

Then open `http://localhost:4200` in your browser.

## Project Structure

```
src/app/
  models/
    question.ts        # Question, AnswerOption, AnsweredQuestion, QuizState
  services/
    quiz.ts             # Quiz state service (BehaviorSubject + RxJS)
  components/
    start-screen/
    question-card/
    results-screen/
  app.ts                # Root component — switches screens based on phase
  app.html
public/
  questions.json         # Quiz content
```

## Possible Future Improvements

- Implement the optional per-question timer
- Persist quiz progress across page refreshes (e.g. via `localStorage`)
- Friendlier error state UI if the questions fail to loa

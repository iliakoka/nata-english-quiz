# Nata's English Quiz 🌸

A cozy, mobile-first English learning quiz (English ↔ Georgian) built with Angular + SCSS.

## Features
- Welcome screen: "Hello Nata, let's start!"
- Multiple choice (English → Georgian and Georgian → English, 4 options)
- Tap-to-match pairs
- Encouraging animations and messages
- Microsoft Clarity tracking with custom tags and events

## Develop
```bash
npm install
npm start      # http://localhost:4200
npm test
```

## Microsoft Clarity
1. Create a project at <https://clarity.microsoft.com> and copy its Project ID.
2. In `src/index.html`, replace `YOUR_CLARITY_PROJECT_ID`.

Custom events (Clarity → Filters → Custom events): `quiz_started`, `answer_correct`, `answer_wrong`, `match_correct`, `match_wrong`, `quiz_completed`.

Custom tags (filterable): `quiz_mode`, `direction`, `question_word`, `answer_selected`, `correct_answer`, `answer_result`, `quiz_score`, `quiz_percent`, `learner`.

Answer buttons also carry `data-answer-selected`, `data-answer-correct`, `data-question-word` and `data-quiz-mode` attributes.

## Deploy to GitHub Pages
1. Push this repo to GitHub (default branch `main`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually in the **Actions** tab). `.github/workflows/deploy.yml` builds with `--base-href "/<repo-name>/"` and publishes.
4. The site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Adding words
Edit `src/app/words.ts`.

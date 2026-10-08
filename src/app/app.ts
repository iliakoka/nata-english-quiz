import { Component, signal } from '@angular/core';
import { ClarityService } from './clarity.service';
import { MultipleChoice } from './multiple-choice';
import { Matching } from './matching';

type Stage = 'welcome' | 'mc' | 'match' | 'result';
type Mode = 'mix' | 'mc' | 'match';

@Component({
  selector: 'app-root',
  imports: [MultipleChoice, Matching],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly stage = signal<Stage>('welcome');
  protected readonly run = signal(0); // forces fresh quiz components on each start
  protected readonly correct = signal(0);
  protected readonly total = signal(0);
  private mode: Mode = 'mix';

  protected readonly matchKind = signal<'words' | 'opposites'>('words');

  constructor(private clarity: ClarityService) {}

  protected start(mode: Mode): void {
    this.mode = mode;
    this.correct.set(0);
    this.total.set(0);
    this.matchKind.set('words');
    this.run.update((r) => r + 1);
    this.stage.set(mode === 'match' ? 'match' : 'mc');
    this.clarity.track('quiz_started', { quiz_mode: mode });
  }

  protected finished(r: { correct: number; total: number }, from: 'mc' | 'match'): void {
    this.correct.update((c) => c + r.correct);
    this.total.update((t) => t + r.total);
    if (from === 'mc' && this.mode === 'mix') {
      this.stage.set('match');
      this.run.update((n) => n + 1);
      return;
    }
    if (from === 'match' && this.matchKind() === 'words') {
      this.matchKind.set('opposites');
      this.run.update((n) => n + 1);
      return;
    }
    const pct = Math.round((this.correct() / this.total()) * 100);
    this.clarity.track('quiz_completed', {
      quiz_mode: this.mode,
      quiz_score: `${this.correct()}/${this.total()}`,
      quiz_percent: pct,
    });
    this.stage.set('result');
  }

  protected resultMessage(): string {
    const pct = this.correct() / this.total();
    if (pct === 1) return 'იდეალური შედეგი! შენ ნამდვილი ვარსკვლავი ხარ, ნატა! 🌟';
    if (pct >= 0.7) return 'შესანიშნავია, ნატა! ძალიან ვამაყობ შენით 💖';
    if (pct >= 0.4) return 'კარგი მცდელობა, ნატა! ყოველი ცდა გაძლიერებს 🌷';
    return 'მთავარია, რომ სცადე, ნატა! სცადე თავიდან 💛';
  }
}

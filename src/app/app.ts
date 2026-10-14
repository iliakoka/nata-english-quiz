import { Component, computed, signal } from '@angular/core';
import { ClarityService } from './clarity.service';
import { SoundService } from './sound.service';
import { MultipleChoice } from './multiple-choice';
import { Matching } from './matching';

type Stage = 'welcome' | 'mc' | 'match' | 'result';
type Mode = 'mix' | 'mc' | 'match';

const MASCOT_QUOTES = [
  'მზად ხარ რეკორდის მოსახსნელად? ⚡',
  'Nata, you are going to crush this! 🚀',
  'Level up your English brain power! 🧠',
  'დღეს ახალი ლეველი უნდა დავხუროთ! 🔥',
  'Ready for the ultimate English battle? 👾',
  'Focus mode: ON! 🎯',
];

@Component({
  selector: 'app-root',
  imports: [MultipleChoice, Matching],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly stage = signal<Stage>('welcome');
  protected readonly run = signal(0);
  protected readonly correct = signal(0);
  protected readonly total = signal(0);
  protected mode: Mode = 'mix';

  protected readonly matchKind = signal<'words' | 'opposites'>('words');
  protected readonly totalXp = signal<number>(this.loadXp());
  protected readonly bestScore = signal<number>(this.loadBestScore());
  protected readonly mascotQuote = signal<string>(MASCOT_QUOTES[0]);
  protected readonly mascotBopping = signal<boolean>(false);

  protected readonly rank = computed(() => {
    if (this.total() === 0) return { label: 'ROOKIE', badge: '🌱', color: '#94a3b8' };
    const pct = this.correct() / this.total();
    if (pct === 1) return { label: 'S+ TITAN', badge: '👑', color: '#ffbe0b' };
    if (pct >= 0.8) return { label: 'S CYBER MASTER', badge: '💎', color: '#00f5d4' };
    if (pct >= 0.6) return { label: 'A WARRIOR', badge: '⚡', color: '#a855f7' };
    if (pct >= 0.4) return { label: 'B EXPLORER', badge: '🚀', color: '#38bdf8' };
    return { label: 'APPRENTICE', badge: '🛡️', color: '#f43f5e' };
  });

  protected readonly accuracyPct = computed(() => {
    return this.total() > 0 ? Math.round((this.correct() / this.total()) * 100) : 0;
  });

  constructor(
    private clarity: ClarityService,
    protected sound: SoundService,
  ) {}

  private loadXp(): number {
    try {
      return parseInt(localStorage.getItem('nata_xp') || '0', 10) || 0;
    } catch {
      return 0;
    }
  }

  private loadBestScore(): number {
    try {
      return parseInt(localStorage.getItem('nata_best_score') || '0', 10) || 0;
    } catch {
      return 0;
    }
  }

  protected tapMascot(): void {
    this.sound.mascot();
    this.mascotBopping.set(true);
    setTimeout(() => this.mascotBopping.set(false), 500);
    const curr = this.mascotQuote();
    const nextQuotes = MASCOT_QUOTES.filter((q) => q !== curr);
    const chosen = nextQuotes[Math.floor(Math.random() * nextQuotes.length)];
    this.mascotQuote.set(chosen);
  }

  protected start(mode: Mode): void {
    this.sound.tap();
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
      this.sound.combo(3);
      this.stage.set('match');
      this.run.update((n) => n + 1);
      return;
    }
    if (from === 'match' && this.matchKind() === 'words') {
      this.sound.combo(4);
      this.matchKind.set('opposites');
      this.run.update((n) => n + 1);
      return;
    }

    const pct = Math.round((this.correct() / this.total()) * 100);
    const earnedXp = this.correct() * 100 + (pct === 100 ? 500 : 0);
    const newTotalXp = this.totalXp() + earnedXp;
    this.totalXp.set(newTotalXp);

    if (pct > this.bestScore()) {
      this.bestScore.set(pct);
      try {
        localStorage.setItem('nata_best_score', String(pct));
      } catch {}
    }
    try {
      localStorage.setItem('nata_xp', String(newTotalXp));
    } catch {}

    this.sound.fanfare();

    this.clarity.track('quiz_completed', {
      quiz_mode: this.mode,
      quiz_score: `${this.correct()}/${this.total()}`,
      quiz_percent: pct,
      earned_xp: earnedXp,
    });
    this.stage.set('result');
  }

  protected resultMessage(): string {
    const pct = this.correct() / this.total();
    if (pct === 1) return 'არარეალური შედეგი! შენ ნამდვილი კიბერ-ლეგენდა ხარ, ნატა! 👑⚡';
    if (pct >= 0.8) return 'შესანიშნავი ქულაა, ნატა! შენი ინგლისური უმაღლეს დონეზეა! 🚀✨';
    if (pct >= 0.6) return 'მაგარი ბრძოლა იყო, ნატა! ყოველი რაუნდით კიდევ უფრო ძლიერდები! ⚡';
    if (pct >= 0.4) return 'კარგი მცდელობაა! კიდევ ერთი რაუნდი და რეკორდს მოხსნი! 🎯';
    return 'არ დანებდე, ნატა! კიბერ-მეომრები მარცხით სწავლობენ. სცადე თავიდან! 🛡️';
  }
}

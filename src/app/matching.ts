import { Component, OnInit, output, signal, computed, input } from '@angular/core';
import { ClarityService } from './clarity.service';
import { OPPOSITES, Pair, TARGET_WORDS } from './challenge';
import { shuffle } from './words';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.html',
})
export class Matching implements OnInit {
  readonly pairs = input(8);
  /** 'words' = English ↔ Georgian, 'opposites' = English ↔ English opposite. */
  readonly kind = input<'words' | 'opposites'>('words');
  readonly done = output<{ correct: number; total: number }>();

  protected readonly left = signal<Pair[]>([]);
  protected readonly right = signal<Pair[]>([]);
  protected readonly selected = signal<string | null>(null);
  protected readonly matched = signal<string[]>([]);
  protected readonly shaking = signal<string | null>(null);
  protected readonly mistakes = signal(0);
  protected readonly message = signal('');
  protected readonly allDone = computed(() => this.matched().length === this.left().length);
  private readonly missed = new Set<string>();

  constructor(private clarity: ClarityService) {}

  ngOnInit(): void {
    const opposites = this.kind() === 'opposites';
    const picks: Pair[] = opposites
      ? shuffle(OPPOSITES).slice(0, this.pairs())
      : shuffle(TARGET_WORDS)
          .slice(0, this.pairs())
          .map((w) => ({ key: w.en, left: w.en, right: w.ka }));
    this.left.set(picks);
    this.right.set(shuffle(picks));
    this.message.set(
      opposites
        ? 'Find the OPPOSITE of each word 🔄'
        : 'Tap an English word, then its Georgian match 💫',
    );
  }

  protected title(): string {
    return this.kind() === 'opposites' ? 'Opposites 🔄' : 'Match the pairs 🔗';
  }

  protected pickLeft(p: Pair): void {
    if (this.matched().includes(p.key)) return;
    this.selected.set(this.selected() === p.key ? null : p.key);
  }

  protected pickRight(p: Pair): void {
    const sel = this.selected();
    if (!sel || this.matched().includes(p.key)) return;
    const correct = sel === p.key;
    this.clarity.track(correct ? 'match_correct' : 'match_wrong', {
      quiz_mode: 'matching_' + this.kind(),
      question_word: sel,
      answer_selected: p.right,
      answer_result: correct ? 'correct' : 'wrong',
    });
    if (correct) {
      this.matched.update((m) => [...m, sel]);
      this.selected.set(null);
      this.message.set(this.allDone() ? 'All matched! 🎉' : 'Lovely match! 💖');
    } else {
      this.missed.add(sel);
      this.mistakes.update((n) => n + 1);
      this.message.set('Not quite, try again 🌷');
      this.shaking.set(p.key);
      setTimeout(() => this.shaking.set(null), 450);
    }
  }

  protected finish(): void {
    this.done.emit({ correct: this.left().length - this.missed.size, total: this.left().length });
  }
}

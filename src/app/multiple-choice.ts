import { Component, OnInit, output, signal, computed, input } from '@angular/core';
import { ClarityService } from './clarity.service';
import { ALL_WORDS, SENTENCES, TARGET_WORDS, similar } from './challenge';
import { ENCOURAGE, PRAISE, Word, shuffle } from './words';

type Kind = 'choice' | 'sentence' | 'typing';

interface Question {
  kind: Kind;
  word?: Word;
  toGeorgian: boolean;
  prompt: string;
  hint: string;
  options: string[];
  answer: string;
}

const PLAN: Kind[] = [
  'choice', 'sentence', 'choice', 'typing', 'sentence', 'choice', 'sentence', 'typing',
  'choice', 'sentence', 'choice', 'typing', 'sentence', 'choice', 'sentence',
];

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.html',
})
export class MultipleChoice implements OnInit {
  readonly count = input(15);
  readonly done = output<{ correct: number; total: number }>();

  protected readonly questions = signal<Question[]>([]);
  protected readonly index = signal(0);
  protected readonly picked = signal<string | null>(null);
  protected readonly score = signal(0);
  protected readonly message = signal('');
  protected typed = signal('');
  protected readonly current = computed(() => this.questions()[this.index()]);
  protected readonly progress = computed(() => (this.index() / this.questions().length) * 100);
  protected readonly sparks = Array.from({ length: 14 }, (_, i) => i);

  constructor(private clarity: ClarityService) {}

  ngOnInit(): void {
    const words = shuffle(TARGET_WORDS);
    const sentences = shuffle(SENTENCES);
    let w = 0;
    let s = 0;
    let c = 0;
    this.questions.set(
      PLAN.slice(0, this.count()).map((kind): Question => {
        if (kind === 'sentence') {
          const sen = sentences[s++];
          return {
            kind,
            toGeorgian: false,
            prompt: sen.text,
            hint: 'Choose the right word to fill the gap',
            options: shuffle(sen.options),
            answer: sen.answer,
          };
        }
        const word = words[w++];
        if (kind === 'typing') {
          return {
            kind,
            word,
            toGeorgian: false,
            prompt: word.ka,
            hint: `Type this in English (${word.en.length} letters, starts with "${word.en[0]}")`,
            options: [],
            answer: word.en,
          };
        }
        const toGeorgian = c++ % 2 === 0;
        const pick = (x: Word) => (toGeorgian ? x.ka : x.en);
        return {
          kind,
          word,
          toGeorgian,
          prompt: toGeorgian ? word.en : word.ka,
          hint: toGeorgian ? 'What is this in Georgian?' : 'What is this in English?',
          options: shuffle([word, ...similar(word, ALL_WORDS, pick)].map(pick)),
          answer: pick(word),
        };
      }),
    );
  }

  protected choose(option: string): void {
    if (this.picked() !== null) return;
    const q = this.current();
    const norm = (t: string) => t.trim().toLowerCase().replace(/^to /, '');
    const correct = norm(option) === norm(q.answer);
    this.picked.set(option);
    this.message.set(shuffle(correct ? PRAISE : ENCOURAGE)[0]);
    if (correct) this.score.update((x) => x + 1);
    this.clarity.track(correct ? 'answer_correct' : 'answer_wrong', {
      quiz_mode: q.kind === 'choice' ? 'multiple_choice' : q.kind,
      direction: q.kind === 'choice' ? (q.toGeorgian ? 'en_to_ka' : 'ka_to_en') : q.kind,
      question_word: q.word?.en ?? q.prompt,
      answer_selected: option,
      correct_answer: q.answer,
      answer_result: correct ? 'correct' : 'wrong',
    });
  }

  protected isRight(): boolean {
    const norm = (t: string) => t.trim().toLowerCase().replace(/^to /, '');
    return norm(this.picked() ?? '') === norm(this.current().answer);
  }

  protected submitTyped(): void {
    if (this.typed().trim()) this.choose(this.typed());
  }

  protected next(): void {
    if (this.index() + 1 >= this.questions().length) {
      this.done.emit({ correct: this.score(), total: this.questions().length });
      return;
    }
    this.picked.set(null);
    this.typed.set('');
    this.index.update((i) => i + 1);
  }

  protected state(option: string): string {
    const p = this.picked();
    if (p === null) return '';
    if (option === this.current().answer) return 'correct';
    return option === p ? 'wrong' : 'dim';
  }
}

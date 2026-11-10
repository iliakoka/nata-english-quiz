import { Component, computed, signal } from '@angular/core';
import { ClarityService } from './clarity.service';
import { SoundService } from './sound.service';
import { MultipleChoice } from './multiple-choice';
import { Matching } from './matching';

type Stage = 'welcome' | 'mc' | 'match' | 'feeling' | 'result';
type Mode = 'mix' | 'mc' | 'match';

const ENVELOPE_QUOTES = [
  // Georgian quotes
  'შენი ღიმილი ძალიან გიხდება ✨',
  'შენთან საუბარი ყოველთვის დღის საუკეთესო ნაწილია 🌸',
  'შენს თვალებში განსაკუთრებული სითბო და სინათლეა 💖',
  'ყოველთვის ახერხებ ჩემს სახეზე ღიმილის მოტანას 🌷',
  'შენი დანახვა ყოველთვის მიხარია, ნატა 💌',
  'შენს გვერდით დრო ისე სწრაფად გადის, ვერც ვამჩნევ ✨',
  'შენი ხმა და სიცილი საოცრად მშვიდ და კარგ განწყობას მიქმნის 🎀',
  'ძალიან საყვარელი და განსაკუთრებული ადამიანი ხარ 💫',
  'დღეს განსაკუთრებულად ლამაზი დღეა, რადგან შენ გწერ 🌹',
  'არ დაგავიწყდეს, რა საოცარი და ნიჭიერი ხარ 💖',
  'შენთან ყოფნა ყველაზე მყუდრო და სასიამოვნო რამეა ☕🌸',
  'შენი პოზიტივი და ენერგია ყველაფერს ანათებს ✨',
  'იმედი მაქვს, ეს პატარა სიურპრიზი გულს გაგითბობს 💌',
  'შენნაირი ადამიანი ძალიან იშვიათია და ამიტომ ხარ განსაკუთრებული 🌷',
  'ერთი შეხედვაც კი საკმარისია მთელი დღის გასალამაზებლად 🌸',
  'შენს ღიმილზე უფრო ლამაზი ცოტა რამ თუ მინახავს 💖',
  'როცა იღიმი, სამყარო თითქოს უფრო ფერადი ხდება 🌈',
  'შენს თბილ გულს არასდროს დაუკარგავს თავისი სინათლე ✨',

  // English quotes
  'Hope this little quiz brings a bright smile to your face today 😊',
  'You have such a warm aura and a genuinely kind heart 💖',
  'Thinking of you always makes my day a hundred times brighter ✨',
  'You are effortlessly charming in everything you do 🌸',
  'Your smile is honestly contagious in the best possible way 🌷',
  'Talking to you is always the highlight of my day 💌',
  'You have this quiet magic that makes everything feel lighter 💫',
  'Never forget how truly special and appreciated you are 🎀',
  'Just a sweet reminder that you mean a lot to me 💖',
  'Wishing you the sweetest and happiest day ahead, Nata! 🌹',
  'You bring out the best smiles in everyone around you ✨',
  'You are smart, beautiful, and wonderful inside and out 🌸',
  'I hope your day is as lovely and sweet as you are 🌷',
  'Whenever you smile, the whole room feels a little warmer 💖',
  'Just wanted to send a little happiness and sunshine your way 💌',
  'No matter what, keep that beautiful confidence shining 💫',
  'Every single conversation with you leaves me smiling 😊',
  'You have a gentle way of making people feel good just by being yourself 🌸',
];

interface FeelingReaction {
  title: string;
  text: string;
  emoji: string;
}

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
  protected readonly mascotQuote = signal<string>(ENVELOPE_QUOTES[0]);
  protected readonly mascotBopping = signal<boolean>(false);
  protected readonly envelopeTaps = signal<number>(0);
  protected readonly totalQuotes = ENVELOPE_QUOTES.length;
  private quotePool: number[] = [];

  // End of quiz special question
  protected readonly selectedFeeling = signal<string | null>(null);
  protected readonly feelingReaction = signal<FeelingReaction | null>(null);

  protected readonly rank = computed(() => {
    if (this.total() === 0) return { label: 'GOOD START', badge: '🌱', color: '#ffb3c6' };
    const pct = this.correct() / this.total();
    if (pct === 1) return { label: 'SUPERSTAR', badge: '🌟', color: '#ffd700' };
    if (pct >= 0.8) return { label: 'BRILLIANT', badge: '💖', color: '#ff7597' };
    if (pct >= 0.6) return { label: 'GREAT JOB', badge: '✨', color: '#ff9ebb' };
    if (pct >= 0.4) return { label: 'GOOD EFFORT', badge: '🌸', color: '#f8ad9d' };
    return { label: 'NICE TRY', badge: '🌷', color: '#ffcbf2' };
  });

  protected readonly accuracyPct = computed(() => {
    return this.total() > 0 ? Math.round((this.correct() / this.total()) * 100) : 0;
  });

  constructor(
    private clarity: ClarityService,
    protected sound: SoundService,
  ) {
    this.refillQuotePool(ENVELOPE_QUOTES[0]);
  }

  private refillQuotePool(excludeQuote?: string): void {
    const indices = Array.from({ length: ENVELOPE_QUOTES.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // If the top element equals the excluded quote, move it down to prevent immediate repetition
    if (excludeQuote && ENVELOPE_QUOTES[indices[indices.length - 1]] === excludeQuote && indices.length > 1) {
      const popped = indices.pop()!;
      indices.unshift(popped);
    }
    this.quotePool = indices;
  }

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
    this.envelopeTaps.update((t) => t + 1);
    setTimeout(() => this.mascotBopping.set(false), 500);

    const curr = this.mascotQuote();
    if (this.quotePool.length === 0) {
      this.refillQuotePool(curr);
    }

    let nextIndex = this.quotePool.pop()!;
    if (ENVELOPE_QUOTES[nextIndex] === curr && this.quotePool.length > 0) {
      const altIndex = this.quotePool.pop()!;
      this.quotePool.push(nextIndex);
      nextIndex = altIndex;
    }

    this.mascotQuote.set(ENVELOPE_QUOTES[nextIndex]);
  }

  protected start(mode: Mode): void {
    this.sound.tap();
    this.mode = mode;
    this.correct.set(0);
    this.total.set(0);
    this.selectedFeeling.set(null);
    this.feelingReaction.set(null);
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

    this.clarity.track('quiz_completed', {
      quiz_mode: this.mode,
      quiz_score: `${this.correct()}/${this.total()}`,
      quiz_percent: pct,
      earned_xp: earnedXp,
    });

    // Go to the special feeling question before showing results!
    this.selectedFeeling.set(null);
    this.feelingReaction.set(null);
    this.sound.mascot();
    this.stage.set('feeling');
  }

  protected chooseFeeling(choice: 'love' | 'friendship' | 'nothing' | 'something'): void {
    this.sound.tap();
    this.selectedFeeling.set(choice);
    this.clarity.track('feeling_selected', { feeling: choice });

    if (choice === 'love') {
      this.feelingReaction.set({
        title: 'Awww, really? 💖',
        text: 'That genuinely made my day! You are wonderful, Nata 🥰',
        emoji: '💖',
      });
    } else if (choice === 'friendship') {
      this.feelingReaction.set({
        title: 'Best friends! 🤝✨',
        text: 'Having you in my life as a friend means a lot to me 🌸',
        emoji: '🤝',
      });
    } else if (choice === 'something') {
      this.feelingReaction.set({
        title: 'Something, huh? 👀✨',
        text: 'I like a little mystery... curiosity makes everything interesting! 💫',
        emoji: '✨',
      });
    } else {
      this.feelingReaction.set({
        title: 'Haha, fair enough! 😂',
        text: 'Honest and straight to the point, I respect the honesty! 🌷',
        emoji: '👀',
      });
    }
  }

  protected seeResults(): void {
    this.sound.fanfare();
    this.stage.set('result');
  }

  protected resultMessage(): string {
    const pct = this.correct() / this.total();
    if (pct === 1) return 'იდეალური შედეგია, ნატა! ყველა კითხვას ბრწყინვალედ გაეცი პასუხი! 🌟✨';
    if (pct >= 0.8) return 'შესანიშნავი ქულაა! ძალიან კარგად იცი ეს სიტყვები 💖';
    if (pct >= 0.6) return 'კარგი შედეგია! ყოველ ჯერზე უკეთესად გამოგდის 🌸';
    if (pct >= 0.4) return 'კარგი მცდელობაა, ნატა! მთავარია, რომ ივარჯიშე 🌷';
    return 'კარგი დასაწყისია! მოდი კიდევ ერთხელ ვცადოთ ერთად 😊';
  }
}

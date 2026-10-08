import { Word, WORDS } from './words';

/** Harder vocabulary (B1-ish). */
export const HARD_WORDS: Word[] = [
  { en: 'Neighbour', ka: 'მეზობელი', emoji: '🏘️' },
  { en: 'Weather', ka: 'ამინდი', emoji: '⛅' },
  { en: 'Delicious', ka: 'გემრიელი', emoji: '😋' },
  { en: 'Dangerous', ka: 'საშიში', emoji: '⚠️' },
  { en: 'Choose', ka: 'არჩევა', emoji: '👆' },
  { en: 'Remember', ka: 'დამახსოვრება', emoji: '🧠' },
  { en: 'Forget', ka: 'დავიწყება', emoji: '🫥' },
  { en: 'Believe', ka: 'დაჯერება', emoji: '🙌' },
  { en: 'Library', ka: 'ბიბლიოთეკა', emoji: '🏛️' },
  { en: 'Hospital', ka: 'საავადმყოფო', emoji: '🏥' },
  { en: 'Airport', ka: 'აეროპორტი', emoji: '✈️' },
  { en: 'Ticket', ka: 'ბილეთი', emoji: '🎫' },
  { en: 'Brave', ka: 'მამაცი', emoji: '🦁' },
  { en: 'Quiet', ka: 'წყნარი', emoji: '🤫' },
  { en: 'Loud', ka: 'ხმამაღალი', emoji: '📢' },
  { en: 'Difficult', ka: 'რთული', emoji: '🧗' },
  { en: 'Easy', ka: 'მარტივი', emoji: '🪶' },
  { en: 'Early', ka: 'ადრე', emoji: '🐓' },
  { en: 'Late', ka: 'გვიან', emoji: '🕚' },
  { en: 'Always', ka: 'ყოველთვის', emoji: '♾️' },
  { en: 'Never', ka: 'არასოდეს', emoji: '🚫' },
  { en: 'Sometimes', ka: 'ზოგჯერ', emoji: '🌗' },
  { en: 'Because', ka: 'იმიტომ რომ', emoji: '💭' },
  { en: 'Together', ka: 'ერთად', emoji: '👫' },
  { en: 'Enough', ka: 'საკმარისი', emoji: '👌' },
  { en: 'Careful', ka: 'ფრთხილი', emoji: '🧐' },
  { en: 'Strange', ka: 'უცნაური', emoji: '👽' },
  { en: 'Empty', ka: 'ცარიელი', emoji: '🫙' },
  { en: 'Full', ka: 'სავსე', emoji: '🍲' },
  { en: 'Lonely', ka: 'მარტოსული', emoji: '🥀' },
  { en: 'Clever', ka: 'ჭკვიანი', emoji: '💡' },
  { en: 'Kind', ka: 'კეთილი', emoji: '🤗' },
  { en: 'Angry', ka: 'გაბრაზებული', emoji: '😠' },
  { en: 'Surprise', ka: 'სიურპრიზი', emoji: '🎁' },
  { en: 'Dream', ka: 'სიზმარი', emoji: '💭' },
  { en: 'Island', ka: 'კუნძული', emoji: '🏝️' },
  { en: 'Bridge', ka: 'ხიდი', emoji: '🌉' },
  { en: 'Garden', ka: 'ბაღი', emoji: '🌻' },
  { en: 'Smile', ka: 'ღიმილი', emoji: '😁' },
  { en: 'Gift', ka: 'საჩუქარი', emoji: '🎀' },
  { en: 'Secret', ka: 'საიდუმლო', emoji: '🔐' },
  { en: 'Language', ka: 'ენა', emoji: '🗣️' },
  { en: 'Question', ka: 'შეკითხვა', emoji: '❓' },
  { en: 'Answer', ka: 'პასუხი', emoji: '💬' },
];

export const ALL_WORDS: Word[] = [...WORDS, ...HARD_WORDS];

/** Words she is quizzed on (skips the very first beginner batch). */
export const TARGET_WORDS: Word[] = [
  ...WORDS.slice(WORDS.findIndex((w) => w.en === 'Window')),
  ...HARD_WORDS,
];

export interface Sentence {
  text: string; // contains ___
  options: string[];
  answer: string;
}

export const SENTENCES: Sentence[] = [
  { text: 'She ___ to school every day.', options: ['goes', 'go', 'going', 'gone'], answer: 'goes' },
  { text: 'I ___ a book yesterday.', options: ['read', 'reading', 'reads', 'readed'], answer: 'read' },
  { text: 'They are ___ in the garden now.', options: ['play', 'plays', 'playing', 'played'], answer: 'playing' },
  { text: 'I have two ___.', options: ['cat', 'cats', 'a cat', 'cates'], answer: 'cats' },
  { text: 'He is ___ than his brother.', options: ['tall', 'taller', 'tallest', 'more tall'], answer: 'taller' },
  { text: 'We ___ tired because we walked a lot.', options: ['am', 'is', 'are', 'be'], answer: 'are' },
  { text: '___ you like some tea?', options: ['Do', 'Would', 'Are', 'Is'], answer: 'Would' },
  { text: 'The sun ___ in the east.', options: ['rise', 'rises', 'rising', 'rose'], answer: 'rises' },
  { text: 'It is raining, so take an ___.', options: ['umbrella', 'apple', 'egg', 'ocean'], answer: 'umbrella' },
  { text: 'I am ___. I want to eat dinner.', options: ['hungry', 'tired', 'angry', 'cold'], answer: 'hungry' },
  { text: 'My mother ___ a teacher.', options: ['are', 'am', 'is', 'be'], answer: 'is' },
  { text: 'Please ___ the door, it is cold.', options: ['close', 'eat', 'read', 'drink'], answer: 'close' },
  { text: 'He ___ not like coffee.', options: ['do', 'does', 'is', 'are'], answer: 'does' },
  { text: 'I go to bed ___ night.', options: ['at', 'in', 'on', 'to'], answer: 'at' },
  { text: 'Nata ___ English every day.', options: ['study', 'studies', 'studying', 'studied'], answer: 'studies' },
  { text: 'There ___ many flowers in the garden.', options: ['is', 'are', 'be', 'am'], answer: 'are' },
  { text: 'I was born ___ Georgia.', options: ['in', 'on', 'at', 'to'], answer: 'in' },
  { text: 'This cake is ___! I want more.', options: ['delicious', 'dangerous', 'empty', 'quiet'], answer: 'delicious' },
  { text: 'We ___ to the sea last summer.', options: ['go', 'goes', 'went', 'going'], answer: 'went' },
  { text: 'Can you ___ me your pen?', options: ['lend', 'lent', 'lending', 'lends'], answer: 'lend' },
];

export interface Pair {
  key: string;
  left: string;
  right: string;
}

/** English opposites for the second matching round. */
export const OPPOSITES: Pair[] = [
  ['Big', 'Small'], ['Hot', 'Cold'], ['Fast', 'Slow'], ['Day', 'Night'],
  ['Happy', 'Sad'], ['Easy', 'Difficult'], ['Early', 'Late'], ['Full', 'Empty'],
  ['Always', 'Never'], ['Loud', 'Quiet'], ['Open', 'Close'], ['Old', 'New'],
  ['Good', 'Bad'], ['Up', 'Down'], ['Brave', 'Scared'], ['Buy', 'Sell'],
].map(([left, right]) => ({ key: left, left, right }));

/** Picks `n` options that look similar to the answer (same first letter / similar length). */
export function similar(
  target: Word,
  pool: Word[],
  pick: (w: Word) => string,
  n = 3,
): Word[] {
  const t = pick(target);
  return pool
    .filter((w) => w.en !== target.en && pick(w) !== t)
    .map((w) => {
      const s = pick(w);
      const score =
        Math.abs(s.length - t.length) - (s[0] === t[0] ? 3 : 0) + Math.random() * 3;
      return { w, score };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, n)
    .map((x) => x.w);
}

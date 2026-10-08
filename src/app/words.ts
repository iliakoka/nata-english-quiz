export interface Word {
  en: string;
  ka: string;
  emoji: string;
}

/** Foundational everyday words: English -> Georgian. */
export const WORDS: Word[] = [
  { en: 'Hello', ka: 'გამარჯობა', emoji: '👋' },
  { en: 'Thank you', ka: 'მადლობა', emoji: '🙏' },
  { en: 'Please', ka: 'გთხოვთ', emoji: '🥺' },
  { en: 'Yes', ka: 'დიახ', emoji: '✅' },
  { en: 'No', ka: 'არა', emoji: '❌' },
  { en: 'Good morning', ka: 'დილა მშვიდობისა', emoji: '🌅' },
  { en: 'Goodbye', ka: 'ნახვამდის', emoji: '🖐️' },
  { en: 'Water', ka: 'წყალი', emoji: '💧' },
  { en: 'Bread', ka: 'პური', emoji: '🍞' },
  { en: 'Milk', ka: 'რძე', emoji: '🥛' },
  { en: 'Apple', ka: 'ვაშლი', emoji: '🍎' },
  { en: 'Cheese', ka: 'ყველი', emoji: '🧀' },
  { en: 'Egg', ka: 'კვერცხი', emoji: '🥚' },
  { en: 'Coffee', ka: 'ყავა', emoji: '☕' },
  { en: 'Tea', ka: 'ჩაი', emoji: '🍵' },
  { en: 'Cat', ka: 'კატა', emoji: '🐱' },
  { en: 'Dog', ka: 'ძაღლი', emoji: '🐶' },
  { en: 'Bird', ka: 'ჩიტი', emoji: '🐦' },
  { en: 'Fish', ka: 'თევზი', emoji: '🐟' },
  { en: 'House', ka: 'სახლი', emoji: '🏠' },
  { en: 'Book', ka: 'წიგნი', emoji: '📖' },
  { en: 'Car', ka: 'მანქანა', emoji: '🚗' },
  { en: 'Tree', ka: 'ხე', emoji: '🌳' },
  { en: 'Flower', ka: 'ყვავილი', emoji: '🌸' },
  { en: 'Sun', ka: 'მზე', emoji: '☀️' },
  { en: 'Moon', ka: 'მთვარე', emoji: '🌙' },
  { en: 'Star', ka: 'ვარსკვლავი', emoji: '⭐' },
  { en: 'Mother', ka: 'დედა', emoji: '👩' },
  { en: 'Father', ka: 'მამა', emoji: '👨' },
  { en: 'Friend', ka: 'მეგობარი', emoji: '🤝' },
  { en: 'Love', ka: 'სიყვარული', emoji: '❤️' },
  { en: 'Big', ka: 'დიდი', emoji: '🐘' },
  { en: 'Small', ka: 'პატარა', emoji: '🐜' },
  { en: 'Red', ka: 'წითელი', emoji: '🔴' },
  { en: 'Blue', ka: 'ლურჯი', emoji: '🔵' },
  { en: 'Green', ka: 'მწვანე', emoji: '🟢' },
  { en: 'Yellow', ka: 'ყვითელი', emoji: '🟡' },
  { en: 'One', ka: 'ერთი', emoji: '1️⃣' },
  { en: 'Two', ka: 'ორი', emoji: '2️⃣' },
  { en: 'Three', ka: 'სამი', emoji: '3️⃣' },
  // Slightly harder words
  { en: 'Window', ka: 'ფანჯარა', emoji: '🪟' },
  { en: 'Door', ka: 'კარი', emoji: '🚪' },
  { en: 'Kitchen', ka: 'სამზარეულო', emoji: '🍳' },
  { en: 'Bedroom', ka: 'საძინებელი', emoji: '🛏️' },
  { en: 'Chair', ka: 'სკამი', emoji: '🪑' },
  { en: 'Table', ka: 'მაგიდა', emoji: '🍽️' },
  { en: 'Umbrella', ka: 'ქოლგა', emoji: '☂️' },
  { en: 'Rain', ka: 'წვიმა', emoji: '🌧️' },
  { en: 'Snow', ka: 'თოვლი', emoji: '❄️' },
  { en: 'Mountain', ka: 'მთა', emoji: '⛰️' },
  { en: 'Sea', ka: 'ზღვა', emoji: '🌊' },
  { en: 'City', ka: 'ქალაქი', emoji: '🏙️' },
  { en: 'School', ka: 'სკოლა', emoji: '🏫' },
  { en: 'Teacher', ka: 'მასწავლებელი', emoji: '🧑‍🏫' },
  { en: 'Doctor', ka: 'ექიმი', emoji: '🩺' },
  { en: 'Money', ka: 'ფული', emoji: '💰' },
  { en: 'Shop', ka: 'მაღაზია', emoji: '🛍️' },
  { en: 'Breakfast', ka: 'საუზმე', emoji: '🥞' },
  { en: 'Dinner', ka: 'ვახშამი', emoji: '🍝' },
  { en: 'Hungry', ka: 'მშიერი', emoji: '🤤' },
  { en: 'Tired', ka: 'დაღლილი', emoji: '😴' },
  { en: 'Beautiful', ka: 'ლამაზი', emoji: '💐' },
  { en: 'Fast', ka: 'სწრაფი', emoji: '⚡' },
  { en: 'Slow', ka: 'ნელი', emoji: '🐢' },
  { en: 'Cold', ka: 'ცივი', emoji: '🥶' },
  { en: 'Hot', ka: 'ცხელი', emoji: '🥵' },
  { en: 'To eat', ka: 'ჭამა', emoji: '🍴' },
  { en: 'To drink', ka: 'დალევა', emoji: '🥤' },
  { en: 'To sleep', ka: 'ძილი', emoji: '💤' },
  { en: 'To read', ka: 'კითხვა', emoji: '📚' },
  { en: 'To write', ka: 'წერა', emoji: '✍️' },
  { en: 'To walk', ka: 'სიარული', emoji: '🚶' },
  { en: 'Today', ka: 'დღეს', emoji: '📅' },
  { en: 'Tomorrow', ka: 'ხვალ', emoji: '⏭️' },
  { en: 'Yesterday', ka: 'გუშინ', emoji: '⏮️' },
  { en: 'Night', ka: 'ღამე', emoji: '🌃' },
  { en: 'Family', ka: 'ოჯახი', emoji: '👨‍👩‍👧' },
  { en: 'Sister', ka: 'და', emoji: '👧' },
  { en: 'Brother', ka: 'ძმა', emoji: '👦' },
  { en: 'Ten', ka: 'ათი', emoji: '🔟' },
  { en: 'Happy', ka: 'ბედნიერი', emoji: '😊' },
];

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const PRAISE = [
  'Perfect, Nata! 🌟',
  'Amazing! 💖',
  'You got it! 🎉',
  'Brilliant! ✨',
  'So smart! 🌸',
  'Yay, correct! 🥳',
];

export const ENCOURAGE = [
  'Almost! You are learning 💛',
  'Good try, Nata! Next one 🌷',
  'No worries, mistakes help us grow 🌱',
];

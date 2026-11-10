import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('greets Nata on the welcome screen', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(h1?.textContent).toContain('გამარჯობა ნატა');
  });

  it('starts a quiz when the button is pressed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('[data-quiz-action="start"]')!.click();
    await fixture.whenStable();
    expect(el.querySelector('app-multiple-choice')).toBeTruthy();
  });

  it('starts matching mode when called directly', async () => {
    const fixture = TestBed.createComponent(App);
    const comp = fixture.componentInstance;
    await fixture.whenStable();
    (comp as any).start('match');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-matching')).toBeTruthy();
  });

  it('toggles sound on sound button click', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const soundBtn = el.querySelector<HTMLButtonElement>('.sound-btn')!;
    const initialText = soundBtn.textContent?.trim();
    soundBtn.click();
    await fixture.whenStable();
    expect(soundBtn.textContent?.trim()).not.toBe(initialText);
  });

  it('taps envelope mascot to change quote', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const bubble = el.querySelector('.speech-bubble span');
    const initialQuote = bubble?.textContent?.trim();
    const mascot = el.querySelector<HTMLButtonElement>('.mascot-pod')!;
    mascot.click();
    await fixture.whenStable();
    expect(bubble?.textContent?.trim()).not.toBe(initialQuote);
  });

  it('shows feeling question at the end and responds to love option', async () => {
    const fixture = TestBed.createComponent(App);
    const comp = fixture.componentInstance;
    await fixture.whenStable();

    // Set to opposites so this matching round completes the quiz
    (comp as any).matchKind.set('opposites');
    (comp as any).finished({ correct: 10, total: 10 }, 'match');
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.feeling-view')).toBeTruthy();
    expect(el.querySelector('.feeling-prompt')?.textContent).toContain('What do you feel about me?');

    const options = Array.from(el.querySelectorAll('.feeling-btn')).map((b) => b.textContent?.trim());
    expect(options.some((o) => o?.includes('Love'))).toBe(true);
    expect(options.some((o) => o?.includes('Friendship'))).toBe(true);
    expect(options.some((o) => o?.includes('Something'))).toBe(true);
    expect(options.some((o) => o?.includes('Nothing'))).toBe(true);

    const loveBtn = Array.from(el.querySelectorAll<HTMLButtonElement>('.feeling-btn')).find((b) =>
      b.textContent?.includes('Love')
    )!;
    loveBtn.click();
    await fixture.whenStable();

    expect(el.querySelector('.feeling-feedback')).toBeTruthy();
    const nextBtn = el.querySelector<HTMLButtonElement>('.feeling-feedback .next-btn')!;
    nextBtn.click();
    await fixture.whenStable();

    expect(el.querySelector('.result-screen')).toBeTruthy();
    expect(el.querySelector('.feeling-summary-tag')?.textContent).toContain('Love');
  });
});

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

  it('starts matching mode when match button is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('[data-quiz-action="start-match"]')!.click();
    await fixture.whenStable();
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
});

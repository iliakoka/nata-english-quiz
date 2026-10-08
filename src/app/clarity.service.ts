import { Injectable } from '@angular/core';

type ClarityFn = (...args: unknown[]) => void;

/** Thin wrapper over the Microsoft Clarity JS API (safe if Clarity is blocked/not loaded). */
@Injectable({ providedIn: 'root' })
export class ClarityService {
  private get clarity(): ClarityFn | undefined {
    return (window as unknown as { clarity?: ClarityFn }).clarity;
  }

  /** Sets filterable custom tags (key/value) and fires a named custom event. */
  track(event: string, tags: Record<string, string | number | boolean> = {}): void {
    const c = this.clarity;
    if (!c) return;
    try {
      for (const [k, v] of Object.entries(tags)) {
        c('set', k, String(v));
      }
      c('event', event);
    } catch {
      /* analytics must never break the quiz */
    }
  }
}

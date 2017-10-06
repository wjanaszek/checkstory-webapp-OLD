import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition(':enter', [
      // css styles at the begin of transition
      style({ opacity: 0 }),
      // css styles at the end of transition
      animate('.5s', style({ opacity: 1 }))
    ]),
  ]);

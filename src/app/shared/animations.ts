import { trigger, style, state, transition, animate } from "@angular/animations";

export const fade = () => {
    return trigger('fade', [
        state('false', style({
            opacity: 0,
            transform: 'transformX(-100%)'
        })),

        state('true', style({
            opacity: 1,
            transform: 'transformX(0)'
        })),

        transition('true <=> false', animate(300))
    ])
}
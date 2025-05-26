import { Injectable } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AnimationState } from './animation-state.enum';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  // Define reusable animation state styles
  private static readonly visibleState = state(AnimationState.VISIBLE, style({
    opacity: 1,
    transform: 'translateX(0px)',
    zIndex: 10
  }));

  private static readonly hiddenLeftState = state(AnimationState.HIDDEN_LEFT, style({
    opacity: 0.5,
    transform: 'translateX(-15vw) rotateY(-30deg) scale(.8)',
    zIndex: 5
  }));

  private static readonly hiddenRightState = state(AnimationState.HIDDEN_RIGHT, style({
    opacity: 0.5,
    transform: 'translateX(15vw) rotateY(30deg) scale(.8)',
    zIndex: 5
  }));

  private static readonly hiddenFarState = state(AnimationState.HIDDEN_FAR, style({
    opacity: 0,
    transform: 'translateX(0px)',
    zIndex: 1
  }));

  /** Static function to get the animation trigger */
  public static getAnimationTrigger() {
    return trigger('animation', [
      this.visibleState,
      this.hiddenLeftState,
      this.hiddenRightState,
      this.hiddenFarState,
      transition('* => *', animate('1s ease-in-out'))
    ]);
  }

  /** Function to determine the animation state dynamically */
  public getState(index: number, selectedIndex: number, total: number): AnimationState {
    if (index == selectedIndex)
      return AnimationState.VISIBLE;

    if ((index == (selectedIndex - 1)) || ((selectedIndex == 0) && (index == (total - 1))))
      return AnimationState.HIDDEN_LEFT;

    if ((index == (selectedIndex + 1)) || ((selectedIndex == (total - 1)) && (index == 0)))
      return AnimationState.HIDDEN_RIGHT;

    return AnimationState.HIDDEN_FAR;

  }
}
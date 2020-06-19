import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('hide', style({opacity: 0})),
      state('show', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition('hide <=> show', [
        animate(500)
      ])
    ])
  ]
})
export class LoadingComponent implements AfterViewInit, OnDestroy {

  backgroundColor = '#00000080';
  animationState = 'hide';
  showAnimationDone = new BehaviorSubject<boolean>(false);
  hideAnimationDone = new BehaviorSubject<boolean>(false);

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.animationState = 'show';
    this.cdRef.detectChanges();
  }

  onAnimationStart($event: AnimationEvent) {
  }

  onAnimationDone($event: AnimationEvent) {
    if ($event.toState === 'show') {
      this.showAnimationDone.next(true);
    } else {
      this.hideAnimationDone.next(true);
    }
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.showAnimationDone.getValue()) {
        this.animationState = 'hide';
        this.cdRef.detectChanges();
        this.hideAnimationDone.subscribe(
          res => {
            if (res) {
              resolve();
            }
          }
        );
      } else {
        this.showAnimationDone.subscribe(res => {
          if (res) {
            this.animationState = 'hide';
            this.cdRef.detectChanges();
            this.hideAnimationDone.subscribe(
              ev => {
                if (ev) {
                  resolve();
                }
              }
            );
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.showAnimationDone.complete();
    this.hideAnimationDone.complete();
  }

}

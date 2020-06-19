import {ComponentRef, Injectable} from '@angular/core';
import {LoadingModule} from './loading.module';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoadingComponent} from './loading.component';

@Injectable({
  providedIn: LoadingModule
})
export class LoadingService {

  // tslint:disable-next-line:variable-name
  private _overlayRef: OverlayRef;
  // tslint:disable-next-line:variable-name
  private _loadingComponentRef: ComponentRef<LoadingComponent>;
  // tslint:disable-next-line:variable-name
  private _loadingComponentPortal: ComponentPortal<LoadingComponent>;
  private loadingCounter = 1;

  constructor(
    private overlay: Overlay
  ) {
  }

  private getOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }
    this._overlayRef = this.overlay.create({
      height: '100%',
      width: '100%'
    });
    return this._overlayRef;
  }

  private getLoadingComponentPortal(): ComponentPortal<LoadingComponent> {
    if (this._loadingComponentPortal) {
      return this._loadingComponentPortal;
    }
    this._loadingComponentPortal = new ComponentPortal(LoadingComponent);
    return this._loadingComponentPortal;
  }

  show(backgroundColor = '#00000080') {
    if (this.loadingCounter === 1 && !this._loadingComponentRef) {
      this._loadingComponentRef = this.getOverlay().attach(this.getLoadingComponentPortal());
      if (backgroundColor) {
        this._loadingComponentRef.instance.backgroundColor = backgroundColor;
      }
    }
    this.loadingCounter++;
  }

  hide() {
    this.loadingCounter--;
    if (this.loadingCounter === 1 && this._loadingComponentRef) {
      this._loadingComponentRef.instance.close().then(
        () => {
          this._loadingComponentRef = null;
          this._overlayRef.detach();
        }
      );
    }
  }
}

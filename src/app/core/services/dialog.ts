import { Injectable, ApplicationRef, EnvironmentInjector, createComponent, ComponentRef, Type } from '@angular/core';
import { Modal } from '../../shared/components/modal/modal';

@Injectable({ providedIn: 'root' })
export class Dialog {
  private modalRef?: ComponentRef<Modal>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open<T>(component: Type<T>, title = ''): Promise<any> {
    return new Promise((resolve) => {
      if (this.modalRef) return; // evita múltiples modales

      // Crear modal
      this.modalRef = createComponent(Modal, {
        environmentInjector: this.injector,
      });

      this.modalRef.instance.title.set(title);
      this.modalRef.instance.close.subscribe((res) => {
        resolve(res);
        this.close();
      });

      // Crear componente dentro del modal
      const contentRef = createComponent(component, {
        environmentInjector: this.injector,
      });

      contentRef.setInput('onClose', (result: any) => {
        console.log(result);
        this.modalRef?.instance.onClose(result);
      });

      const modalElement: HTMLElement = this.modalRef.location.nativeElement;
      const contentContainer = modalElement.querySelector('.modal-content');
      if (contentContainer) {
        contentContainer.replaceWith(contentRef.location.nativeElement);
      }

      // Adjuntar ambos al DOM
      this.appRef.attachView(this.modalRef.hostView);
      this.appRef.attachView(contentRef.hostView);

      document.body.appendChild(modalElement);
    });
  }

  private close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = undefined;
    }
  }
}

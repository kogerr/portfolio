export class ScrollLock implements EventListenerObject {
    interrupt: false;
    handleEvent = function (event: Event): void {
      let currentY = window.scrollY;
      if (this.interrupt) { window.scrollTo(0, currentY); }
    };

    on = function(): void {
      this.interrupt = true;
      setTimeout(() => this.interrupt = false, 1000);
    };
}

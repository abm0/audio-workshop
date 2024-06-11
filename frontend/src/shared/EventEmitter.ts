export class EventEmitter {
  private static instance: EventEmitter;
  private eventTarget: EventTarget;

  private constructor() {
      this.eventTarget = new EventTarget();
  }

  public static getInstance(): EventEmitter {
      if (!EventEmitter.instance) {
          EventEmitter.instance = new EventEmitter();
      }
      return EventEmitter.instance;
  }

  public emit(eventName: string, detail?: any): void {
      const event = new CustomEvent(eventName, { detail });
      this.eventTarget.dispatchEvent(event);
  }

  public on(eventName: string, callback: EventListener): void {
      this.eventTarget.addEventListener(eventName, callback);
  }

  public off(eventName: string, callback: EventListener): void {
      this.eventTarget.removeEventListener(eventName, callback);
  }
}


export const eventEmitter = EventEmitter.getInstance()
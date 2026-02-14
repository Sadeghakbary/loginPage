type EventCallback<T = unknown> = (data: T) => void;

const eventBus = {
  on: <T = unknown>(event: string, callback: EventCallback<T>): EventListener => {
    const handler: EventListener = (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      callback(customEvent.detail);
    };

    document.addEventListener(event, handler);
    return handler;
  },
  dispatch: <T = unknown>(event: string, data?: T) => {
    document.dispatchEvent(new CustomEvent<T>(event, { detail: data ?? null }));
  },
  remove: (event: string, handler: EventListener) => {
    document.removeEventListener(event, handler);
  },
};

export default eventBus;

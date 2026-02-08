const eventBus = {
  on: (event: string, callback: (data: any) => void) => {
    document.addEventListener(event, (e: any) => callback(e.detail));
  },
  dispatch: (event: string, data?: any) => {
    document.dispatchEvent(new CustomEvent(event, { detail: data || null }));
  },
  remove: (event: string, callback?: (data: any) => void) => {
    if (callback) {
      document.removeEventListener(event, callback);
    } else {
      document.removeEventListener(event, () => {});
    }
  },
};

export default eventBus;

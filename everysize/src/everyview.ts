import axios, { AxiosResponse, AxiosError } from 'axios';
import Fingerprint2, { Component } from 'fingerprintjs2';
import Bowser from 'bowser';

interface IEvent {
  date: Date;
  eventType: string;
  field1?: string;
  value1?: number;
  field2?: string;
  value2?: number;
  extra?: string;
}

export class EveryviewTracker {
  baseUrl: string;
  applicationCode: string;
  sessionId: string | null;
  windowId: string;
  initializationFailed: boolean;
  onInitializationFailed?: (error: string) => void;
  waitingEvents: IEvent[] | null = [];
  failedEvents: IEvent[] = [];
  pingFrequencySeconds = 30;

  constructor(applicationCode: string, baseUrl?: string, shouldDisablePings: boolean = false, onInitializationFailed?: () => void) {
    this.applicationCode = applicationCode;
    this.baseUrl = baseUrl || 'https://everyview-api.kiba.dev';
    this.sessionId = null;
    this.windowId = generateUUID();
    this.initializationFailed = false;
    this.onInitializationFailed = onInitializationFailed;
    setTimeout(this.initialize, 500);
    if (!shouldDisablePings) {
      this.startPings();
    }
  }

  private initialize = (): void => {
    Fingerprint2.get((fingerprintComponents: Component[]) => {
      const values = fingerprintComponents.map((component: Component): string => component.value);
      const hashedFingerprint = Fingerprint2.x64hash128(values.join(''), 31);
      axios.post(`${this.baseUrl}/v1/generate-anonymous-session`, {code: this.applicationCode, fingerprint: hashedFingerprint}).then((response: AxiosResponse) => {
        this.sessionId = response.data.sessionId;
        this.sendWaitingEvents();
      }).catch((error: AxiosError): void => {
        // TODO(krish): add some kind of retry
        const message = error.response?.data.detail || error.message;
        this.initializationFailed = false;
        if (this.onInitializationFailed) {
          this.onInitializationFailed(message);
        } else {
          console.error(`Failed to initialize everyview: ${message}`);
        }
      });
    });
  }

  private startPings = (): void => {
    setInterval((): void => {
      this.trackPing();
    }, this.pingFrequencySeconds * 1000);
  }

  track = (eventType: string, field1?: string, value1?: number, field2?: string, value2?: number, extra?: object): void => {
    return this.sendEvent({date: new Date(), eventType, field1, value1, field2, value2, extra: JSON.stringify(extra)});
  };

  private trackPing = (): void => {
    this.track('ping', undefined, isDocumentVisible() ? 1 : 0);
  };

  trackApplicationOpen = (): void => {
    const browserDetails = Bowser.parse(window.navigator.userAgent);
    return this.track('app_open', document.referrer || undefined, undefined, undefined, undefined, {
      browser: {
        name: browserDetails.browser.name,
        version: browserDetails.browser.version,
      },
      os: {
        name: browserDetails.os.name,
        version: browserDetails.os.version,
      },
      device: {
        vendor: browserDetails.platform.vendor,
        model: browserDetails.platform.model,
        type: browserDetails.platform.type,
      },
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  };

  trackPageOpen = (path: string, query: string) => {
    return this.track('page_open', path, undefined, query, undefined, {referrer: document.referrer || undefined});
  };

  trackButtonClick = (buttonName: string) => {
    return this.track('button_click', buttonName);
  };

  trackFormSubmit = (formName: string, value1?: number, field2?: string, value2?: number, extra?: object) => {
    return this.track('form_submit', formName, value1, field2, value2, extra);
  };

  private sendEvent = (event: IEvent): void => {
    if (this.initializationFailed) {
      console.warn('everyview initialization failed so events will not be sent.');
      return;
    }
    if (!this.sessionId) {
      if (!this.waitingEvents) {
        console.warn('waitingEvents has been cleared. This should not have happened since sessionId has not be sent.');
        return;
      }
      this.waitingEvents.push(event);
      return;
    }
    axios.post(`${this.baseUrl}/v1/events/create-anonymous`, {...event, code: this.applicationCode, sessionId: this.sessionId, windowId: this.windowId}).catch((error: AxiosError): void => {
      const message = error.response?.data.detail || error.message;
      console.error(`Failed to send event: ${message}`);
      // TODO(krish): should these be retried?
      this.failedEvents.push(event);
    });
}

  private sendWaitingEvents = (): void => {
    if (!this.sessionId) {
      console.error(`sendWaitingEvents should not be called until the sessionId is set!`);
      return;
    }

    if (!this.waitingEvents) {
      return;
    }

    const events = [...this.waitingEvents];
    this.waitingEvents = null;
    events.forEach((event: IEvent): void => this.sendEvent(event));
  }
}


// string util
export const CHARACTERS_NUMERIC = '1234567890';
export const CHARACTERS_ALPHA_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const CHARACTERS_ALPHA_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const CHARACTERS_ALPHA = `${CHARACTERS_ALPHA_LOWERCASE}${CHARACTERS_ALPHA_UPPERCASE}`;
export const CHARACTERS_ALPHANUMERIC = `${CHARACTERS_ALPHA}${CHARACTERS_NUMERIC}`;
export const CHARACTERS_HEX = `${CHARACTERS_NUMERIC}abcdef`;

export const generateRandomString = (length: number, characters: string = CHARACTERS_ALPHANUMERIC): string => {
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

export const generateUUID = (shouldIncludeDashes: boolean = false): string => {
  let uuid = generateRandomString(32, CHARACTERS_HEX);
  if (shouldIncludeDashes) {
    uuid = [
      uuid.substring(0, 8),
      uuid.substring(8, 12),
      uuid.substring(12, 16),
      uuid.substring(16, 20),
      uuid.substring(20)
    ].join('-');
  }
  return uuid;
};

// browser util
// see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Example
export const isDocumentVisible = (): boolean => {
  let hiddenKey: string | undefined;
  if (document.hidden !== undefined) {
    hiddenKey = 'hidden';
  // @ts-ignore
  } else if (document.msHidden !== undefined) {
    hiddenKey = 'msHidden';
  // @ts-ignore
  } else if (document.webkitHidden !== undefined) {
    hiddenKey = 'webkitHidden';
  }
  // @ts-ignore
  return hiddenKey ? !document[hiddenKey] : true;
};

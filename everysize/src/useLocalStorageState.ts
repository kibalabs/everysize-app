import React from 'react';

import { stringListToString, stringListFromString } from './serializationUtil';

export default class LocalStorageClient {
  private localStorage: Storage;

  constructor(localStorage: Storage) {
    this.localStorage = localStorage;
  }

  public getValue(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public setValue(key: string, value: string | null | undefined): void {
    if (value === null || value === undefined) {
      this.removeValue(key);
    } else {
      this.localStorage.setItem(key, value);
    }
  }

  public removeValue(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clear(): void {
    this.localStorage.clear();
  }
}

export const useLocalStorageState = (name: string, overrideInitialValue?: string | null): [string | null, (newValue: string | null) => void] => {
  const localStorage = new LocalStorageClient(window.localStorage);
  const [value, setValue] = React.useState<string | null>((): string | null => {
    if (overrideInitialValue !== undefined) {
      localStorage.setValue(name, overrideInitialValue);
    }
    return localStorage.getValue(name);
  });

  const valueSetter = (newValue: string | null): void => {
    localStorage.setValue(name, newValue);
    setValue(newValue);
  };

  return [value, valueSetter];
};

export const useStringListLocalStorageState = (name: string, delimiter: string = ',', overrideInitialValue?: string[] | null): [string[] | null, (newValue: string[] | null) => void] => {
  const [value, setValue] = useLocalStorageState(name, stringListToString(overrideInitialValue));
  return [stringListFromString(value, delimiter) as string[] | null, ((newValue: string[] | null): void => setValue(stringListToString(newValue, delimiter) as string | null))];
};

import React from 'react';


export const useUrlQueryState = (name: string): [string | null | undefined, (newValue: string | null | undefined) => void] => {
  const [value, setValue] = React.useState<string | undefined>((): string | undefined => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get(name);
    return paramValue === null ? undefined : paramValue;
  });

  const setter = React.useCallback((newValue: string | null | undefined): void => {
    const params = new URLSearchParams(window.location.search);
    if (newValue === null || newValue === undefined) {
      params.delete(name);
    } else {
      params.set(name, newValue);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    setValue(newValue === null ? undefined : newValue);
  }, [name]);

  return [value, setter];
};

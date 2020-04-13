import React from 'react';

export function useValueSync<T>(value: T, setter: (value: T) => void): void {
  React.useEffect((): void => {
    setter(value);
  }, [value, setter]);
}

import * as React from 'react';
import deepEqual from 'deep-equal';


export const deepCompare = <T>(object1: T, object2: T): boolean => (
  deepEqual(object1, object2, { strict: true })
);

export const useDeepCompareRef = <T>(value: T): T => {
  const ref = React.useRef<T>(value);
  if (!deepCompare(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeepCompareEffect(callback: () => void, dependencies: any[]): void {
  React.useEffect(callback, useDeepCompareRef(dependencies));
}

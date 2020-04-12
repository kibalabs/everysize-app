import React from 'react';
import { useEventListener } from './useEventListener';

export interface ISize {
  width: number;
  height: number;
}

export const useSize = (node: HTMLDivElement | null): ISize | null => {
  const [size, setSize] = React.useState<ISize | null>(null);

  const measure = (): void => {
    if (node) {
      window.requestAnimationFrame((): void => {
        const rect = node.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      });
    }
  };

  React.useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  useEventListener(window, 'resize', measure);
  useEventListener(window, 'scroll', measure);

  return size;
}

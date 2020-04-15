import * as React from 'react';

export const useFavicon = (href: string): void => {
  React.useEffect((): void => {
    const linkElements: HTMLLinkElement[] = Array.from(document.querySelectorAll("link[rel*='icon']"));
    if (linkElements.length === 0) {
      const newLinkElement = document.createElement('link');
      document.getElementsByTagName('head')[0].appendChild(newLinkElement);
      linkElements.push(newLinkElement);
    }
    linkElements.forEach((linkElement: HTMLLinkElement): void => {
      linkElement.rel = 'icon';
      linkElement.href = href;
    });
  }, [href]);
};

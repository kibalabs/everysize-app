
export interface IDevice {
  code: string;
  name: string;
  width: number;
  height: number;
}

export const devices = [{
  code: 'ip-11',
  name: 'iPhone 11, Pro Max',
  width: 414,
  height: 896,
}, {
  code: 'ip-11pro',
  name: 'iPhone 11 Pro',
  width: 375,
  height: 812,
}, {
  code: 'ip-3g',
  name: 'iPhone 3G',
  width: 320,
  height: 480,
}, {
  code: 'dp-1080',
  name: '1080p Desktop',
  width: 1920,
  height: 1080,
}, {
  code: 'dp-1080-v',
  name: '1080p Desktop (Vertical)',
  width: 1080,
  height: 1920,
}, {
  code: 'bs-xl',
  name: 'Bootstrap xl',
  width: 1200,
  height: 1080,
}, {
  code: 'bs-lg',
  name: 'Bootstrap lg',
  width: 992,
  height: 1080,
}, {
  code: 'bs-md',
  name: 'Bootstrap md',
  width: 768,
  height: 1080,
}, {
  code: 'bs-sm',
  name: 'Bootstrap sm',
  width: 576,
  height: 1080,
}, {
  code: 'bs-xs',
  name: 'Bootstrap xs',
  width: 575,
  height: 1080,
}];

export const getDeviceByCode = (deviceCode?: string | null): IDevice | null => {
  if (!deviceCode) {
    return null;
  }
  const candidates = devices.filter((device: IDevice): boolean => device.code === deviceCode);
  if (candidates.length === 0) {
    return null;
  }
  return candidates[0];
}

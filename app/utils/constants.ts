import { Accept } from 'react-dropzone';

export const extractText = (
  text: string,
  replace?: string,
  replaceWith?: string
) => text?.toLowerCase()?.replaceAll(replace || '_', replaceWith || ' ');

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(window?.atob(token?.split('.')[1]));
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
};

export const getInitials = (name: string) => {
  const parts = name?.trim().split(' ');
  if (parts?.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const stringifyParams = (params: object) => {
  return Object.entries(params)
    ?.filter(([, value]) => Boolean(value))
    ?.map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    )
    ?.join('&');
};

export const createUrl = (url: string, params?: object): string => {
  const queryString = params
    ? url?.includes('?')
      ? `&${stringifyParams(params)}`
      : `?${stringifyParams(params)}`
    : '';
  return `${url}${queryString}`;
};

export const find = (data: any, item: any, key?: string) =>
  data?.find((e: any) => (key ? e?.[key] : e) === item);

export const getRandomHexColor = () => {
  const array = new Uint8Array(3); // 3 bytes for R, G, B
  typeof window !== 'undefined' && window.crypto.getRandomValues(array);
  const hexColor: string = Array.from(array)
    .map((byte: number) => byte.toString(16).padStart(2, '0'))
    .join('');

  return `#${hexColor}`;
};

export const FILE_TYPE = {
  TYPE_IMAGE_JPEG: {
    type: { 'image/jpeg': ['.jpg', '.jpeg'] },
    displayName: 'JPG',
  },
  TYPE_IMAGE_PNG: { type: { 'image/png': ['.png'] }, displayName: 'PNG' },
  TYPE_PDF: { type: { 'application/pdf': ['.pdf'] }, displayName: 'PDF' },
};

type FileType = {
  types?: Accept;
  displayNames: string[];
};

export const getAllowedTypes = (fileTypes: string[]): FileType => {
  let types: Accept | undefined = undefined;
  const displayNames: string[] = [];
  fileTypes.forEach((item: string) => {
    const res = FILE_TYPE[item as keyof {}] as any;
    if (res) {
      types = { ...types, ...res.type };
      displayNames.push(res.displayName);
    }
  });

  return { types, displayNames };
};

export const BOOLEAN_OPTIONS = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

export const extractLatLng = (url: string) => {
  if (!url) {
    return null;
  }
  const match = url.match(/@([-.\d]+),([-.\d]+)/);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  }
  return null;
};

export function combine(...args: (string | undefined | null)[]): string {
  return args?.filter(Boolean)?.join(' ');
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// todo - survey and get actual units
export const MEASUREMENT_UNITS = [
  {
    label: 'Kg',
    value: 'kg',
  },
  {
    label: 'Ton',
    value: 'ton',
  },
];

export const ObjectUtils = {
  pick: <T, U extends keyof T>(
    item: T,
    keys: U[],
    copy: Pick<T, U> = {} as any
  ): Pick<T, U> => {
    keys.forEach((key) => (copy[key] = item[key]));
    return copy!;
  },
};

export const determineSearchType = (value: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\+?[0-9\s-]{7,15}$/;
  if (emailPattern.test(value)) {
    return 'email';
  } else if (phonePattern.test(value)) {
    return 'phone';
  } else {
    return 'name';
  }
};

export const getEncodedFilters = <T extends object>(filters: T) => {
  if (typeof window === "undefined") {
      return undefined;
  }
  return Object.values(filters).length ? window?.btoa(JSON.stringify(filters)) : undefined;
};

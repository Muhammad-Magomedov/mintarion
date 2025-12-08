import clipboardCopy from "clipboard-copy";
import type { IGetTimeAgoStrOptions } from "../types/utils";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getTimeAgoStr(
  isoDateStr: string,
  options: IGetTimeAgoStrOptions = {
    separator: "",
    suffix: {
      milliseconds: "ms",
      seconds: "s",
      minutes: "m",
      hours: "h",
      days: "d",
      months: "mo",
      years: "y",
    },
  }
): string {
  const { separator, suffix } = options;

  try {
    const now = new Date();
    const date = new Date(isoDateStr);
  
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffMs < 1000) return `${diffMs}${separator}${suffix.milliseconds}`;
    if (diffSec < 60) return `${diffSec}${separator}${suffix.seconds}`;
    if (diffMin < 60) return `${diffMin}${separator}${suffix.minutes}`;
    if (diffHours < 24) return `${diffHours}${separator}${suffix.hours}`;
    if (diffDays < 30) return `${diffDays}${separator}${suffix.days}`;
  
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}${separator}${suffix.months}`;
  
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears}${separator}${suffix.years}`;
  } catch(e) {
    return "";
  }
}

export function isValidISOString(value: string): boolean {
  if (typeof value !== "string") return false;

  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

  if (!isoRegex.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function formatDateYYYYMMDD(dateInput: string | Date) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toISOString().split('T')[0];
}

export function formatDateShort(dateInput: string | Date) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}


export async function copyHtmlText(htmlString: string) {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;

  const plainText = temp.innerText;
  try {
    await clipboardCopy(plainText);
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

export function getObjValueByNumber<T>(
  obj: Record<number, T>,
  n: number,
  type: "gt" | "lt"
): T | null {
  const entries = Object.entries(obj)
    .map(([k, v]) => [Number(k), v] as [number, T])
    .sort(([a], [b]) => a - b);

  switch (type) {
    case "gt":
      for (const [key, value] of entries) {
        if (n >= key) {
          return value;
        }
      }
      break;
    case "lt":
      for (const [key, value] of entries.reverse()) {
        if (n <= key) {
          return value;
        }
      }
      break;
  }

  return null;
}

export function getRandomArrItem<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '0';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0';
  }

  if (num === 0) {
    return '0';
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1_000_000_000) {
    return sign + (absNum / 1_000_000_000).toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + 'B';
  }

  if (absNum >= 1_000_000) {
    return sign + (absNum / 1_000_000).toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + 'M';
  }

  if (absNum >= 10_000) {
    return sign + (absNum / 1_000).toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + 'K';
  }

  if (absNum >= 1) {
    return sign + absNum.toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (absNum < 1) {
    const str = absNum.toString();
    const match = str.match(/^0\.0*[1-9]/);
    
    if (match) {
      const zeros = match[0].split('0').length - 2;
      const decimals = zeros + 3;
      
      return sign + absNum.toLocaleString('en', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    
    return sign + absNum.toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }

  return sign + absNum.toLocaleString('en');
}
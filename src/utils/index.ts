export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function getNextBirthday(birthdayDate: string): Date {
  const now = new Date();
  const [, month, day] = birthdayDate.split('-').map(Number);
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next <= now) {
    next = new Date(now.getFullYear() + 1, month - 1, day);
  }
  return next;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export async function shareWebsite(title: string, text: string) {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title, text, url });
    trackEvent('share', { method: 'native' });
  } else {
    await navigator.clipboard.writeText(url);
    trackEvent('share', { method: 'clipboard' });
    return 'copied';
  }
}

export function downloadTextAsFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  trackEvent('download', { type: filename });
}

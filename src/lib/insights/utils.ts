import crypto from 'crypto';

export function hashText(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export function nowIso(): string {
  return new Date().toISOString();
}

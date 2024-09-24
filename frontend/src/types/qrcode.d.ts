declare module 'qrcode' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function toDataURL(text: string, options?: any): Promise<string>;
  }
  
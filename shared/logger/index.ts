/* eslint-disable no-console */

import COLOR from './Color';

class Logger {
  private _debug = true;

  constructor(private context: string, private color: COLOR) {}

  private processMessage(message: any): string {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }

    return message;
  }

  private createMessage(
    messages: Array<any>,
    color: COLOR = this.color
  ): Array<any> {
    return [
      ...this.createContext(color),
      ...messages.map(this.processMessage),
      COLOR.Reset
    ];
  }

  private createContext(color: COLOR): Array<string> {
    return [`${color}%s`, `[${this.context}]`];
  }

  public debug(value: boolean): void {
    this._debug = value;
  }

  public log(...messages: Array<any>): void {
    if (this._debug) {
      console.log(...this.createMessage(messages));
    }
  }

  public warn(...messages: Array<any>): void {
    if (this._debug) {
      console.log(...this.createMessage(messages, COLOR.FgYellow));
    }
  }

  public error(...messages: Array<any>): void {
    if (this._debug) {
      console.log(...this.createMessage(messages, COLOR.FgRed));
    }
  }

  public trace(): void {
    if (this._debug) {
      console.trace();
    }
  }
}

export default Logger;

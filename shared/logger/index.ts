/* eslint-disable no-console */

import EColor from './enum/EColor';

class Logger {
  private _debug = true;

  constructor(private context: string, private color: EColor) {}

  private processMessage(message: any): string {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }

    return message;
  }

  private createMessage(
    messages: Array<any>,
    color: EColor = this.color
  ): Array<any> {
    return [
      ...this.createContext(color),
      ...messages.map(this.processMessage),
      EColor.Reset
    ];
  }

  private createContext(color: EColor): Array<string> {
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
      console.log(...this.createMessage(messages, EColor.FgYellow));
    }
  }

  public error(...messages: Array<any>): void {
    if (this._debug) {
      console.log(...this.createMessage(messages, EColor.FgRed));
    }
  }

  public trace(): void {
    if (this._debug) {
      console.trace();
    }
  }
}

export default Logger;

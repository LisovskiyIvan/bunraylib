import { getSymbols } from '../../symbols';
import { cstr, i } from '../../utils';

const r = () => getSymbols();

export class CoreModule {
  static getTime(): number {
    return r().symbols.GetTimeW();
  }
  static getFPS(): number {
    return r().symbols.GetFPSW();
  }
  static swapScreenBuffer(): void {
    r().symbols.SwapScreenBufferW();
  }
  static pollInputEvents(): void {
    r().symbols.PollInputEventsW();
  }
  static waitTime(seconds: number): void {
    r().symbols.WaitTimeW(seconds);
  }
  static setRandomSeed(seed: number): void {
    r().symbols.SetRandomSeedW(i(seed));
  }
  static getRandomValue(min: number, max: number): number {
    return r().symbols.GetRandomValueW(i(min), i(max));
  }
  static takeScreenshot(fileName: string): void {
    r().symbols.TakeScreenshotW(cstr(fileName));
  }
  static openURL(url: string): void {
    r().symbols.OpenURLW(cstr(url));
  }
  static drawFPS(posX: number, posY: number): void {
    r().symbols.DrawFPSW(i(posX), i(posY));
  }
  static traceLog(logLevel: number, text: string): void {
    r().symbols.TraceLogW(i(logLevel), cstr(text));
  }
  static setTraceLogLevel(logLevel: number): void {
    r().symbols.SetTraceLogLevelW(i(logLevel));
  }
}

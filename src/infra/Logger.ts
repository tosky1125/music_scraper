import {AbstractLogger} from "./AbstractLogger";

class Logger extends AbstractLogger {
  log(msg: string): void {
    console.log(msg);
  }

  info(msg: string): void {
    console.log(msg);
  }

  err(e: Error): void {
    console.error(e);
  }

  inProcess(): void {
    /*
    doSomething
    * */
  }
}

export default new Logger();
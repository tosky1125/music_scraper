export abstract class AbstractLogger {
  abstract log(msg: string) : void


  abstract info(msg: string) : void


  abstract err(e:Error) : void

}
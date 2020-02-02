import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CheckAuthLevelTwoMiddleware implements NestMiddleware {
  use(req, res: Response, next: Function) {
    // pass next if clearanceLevel in req.userData is <=2

    try {
      if (req.userData.clearanceLevel <= 2) {
        next();
      } else {
        this.handleError(null, next);
      }
    } catch (error) {
      this.handleError(error, next);
    }
  }

  private handleError(error: Error, next: Function) {
    if (error) {
      error.message = "Auth Failed!!!";
      next(error);
    } else {
      const error = new Error();
      error.message = "Auth Failed !!!";
      next(error);
    }
  }
}

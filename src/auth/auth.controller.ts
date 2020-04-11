import { Controller, UseGuards, Post, Body, Res, HttpException, HttpStatus, Get, Req, Session } from "@nestjs/common";
import { AuthenticatedGuard } from "./authenticated.guard";
import { RequestWithUserData } from "express.interface";
import { Response } from "express"

@Controller('/auth')

export class AuthController {
    constructor() { }

    @UseGuards(AuthenticatedGuard)
    @Post('/logout')
    logout(@Req() req: RequestWithUserData, @Res() res: Response) {
        req.logOut()
        res.status(200).json({
            message: 'Goodbye...You have been logged out of your session successfully. Login to get back in.',
        });
        // console.log(req.user)
    }
}
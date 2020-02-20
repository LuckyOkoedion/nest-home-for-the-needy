import { Controller, Post, Patch, Get, Body, Res } from '@nestjs/common';
import { NavFooterService } from './nav-footer.service';
import { CreateNavFooterDto } from './dto/create-nav-footer.dto';
import { Response } from 'express';

@Controller('/api/site/nav-footer')
export class NavFooterController {
  constructor(private readonly navFooterService: NavFooterService) {}

  @Post()
  async createNavFooter(
    @Body() navFooter: CreateNavFooterDto,
    @Res() res: Response,
  ) {
    try {
      await this.navFooterService.createNavFooterData(navFooter).then(() => {
        res.status(201).json({
          message: 'Nav Footer data created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getNavFooter(@Res() res: Response) {
    try {
      const result = await this.navFooterService.getNavFooterData();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Patch()
  async editNavFooter(@Body() edit, @Res() res: Response) {
    try {
      await this.navFooterService.updateNavFooterData(edit).then(() => {
        res.status(200).json({
          message: 'Nav footer data updated successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

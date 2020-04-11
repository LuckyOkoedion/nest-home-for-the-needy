import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NavFooterService } from './nav-footer.service';
import { CreateNavFooterDto } from './dto/create-nav-footer.dto';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/site/nav-footer')
export class NavFooterController {
  constructor(private readonly navFooterService: NavFooterService) { }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_PUBLIC_SITE_DATA)
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
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch()
  @Permissions(permissionsEnum.UPDATE_PUBLIC_SITE_DATA)
  async editNavFooter(@Body() edit, @Res() res: Response) {
    try {
      await this.navFooterService.updateNavFooterData(edit).then(() => {
        res.status(200).json({
          message: 'Nav footer data updated successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}

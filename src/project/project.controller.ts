import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.MANAGE_PROJECTS)
  async createProject(@Body() project: CreateProjectDto, @Res() res: Response) {
    try {
      await this.projectService.createProject(project).then(() => {
        res.status(201).json({
          message: 'New Project created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_PROJECTS)
  async getAllProjects(@Res() res: Response) {
    try {
      const result = await this.projectService.getAllProjects();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/:projectId')
  @Permissions(permissionsEnum.READ_PROJECTS)
  async getProjectDetail(@Param() params, @Res() res: Response) {
    try {
      const projectId = params.projectId;
      const result = await this.projectService.getProjectDetail(projectId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:projectId')
  @Permissions(permissionsEnum.MANAGE_PROJECTS)
  async editProject(
    @Param() params,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      const projectId = params.projectId;
      await this.projectService.editProject(projectId, edit).then(() => {
        res.status(200).json({
          message: 'A project edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:projectId')
  @Permissions(permissionsEnum.MANAGE_PROJECTS)
  async deleteProject(@Param() params, @Res() res: Response) {
    try {
      const projectId = params.projectId;
      await this.projectService.deleteProject(projectId).then(() => {
        res.status(200).json({
          message: 'A project has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}

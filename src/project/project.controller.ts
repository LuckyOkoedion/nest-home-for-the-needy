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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get('/:projectId')
  @Permissions(permissionsEnum.READ_PROJECTS)
  async getProjectDetail(@Param('projectId') projectId, @Res() res: Response) {
    try {
      const result = await this.projectService.getProjectDetail(projectId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:projectId')
  @Permissions(permissionsEnum.MANAGE_PROJECTS)
  async editProject(
    @Param('projectId') projectId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.projectService.editProject(projectId, edit).then(() => {
        res.status(200).json({
          message: 'A project edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:projectId')
  @Permissions(permissionsEnum.MANAGE_PROJECTS)
  async deleteProject(@Param('projectId') projectId, @Res() res: Response) {
    try {
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

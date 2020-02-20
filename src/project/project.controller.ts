import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';

@Controller('/api/admin/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() project: CreateProjectDto, @Res() res: Response) {
    try {
      await this.projectService.createProject(project).then(() => {
        res.status(201).json({
          message: 'New Project created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllProjects(@Res() res: Response) {
    try {
      const result = await this.projectService.getAllProjects();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:projectId')
  async getProjectDetail(@Param('projectId') projectId, @Res() res: Response) {
    try {
      const result = await this.projectService.getProjectDetail(projectId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:projectId')
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
      console.log(error);
    }
  }
  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId, @Res() res: Response) {
    try {
      await this.projectService.deleteProject(projectId).then(() => {
        res.status(200).json({
          message: 'A project has been deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

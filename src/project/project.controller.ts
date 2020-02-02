import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('/api/admin/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() project: CreateProjectDto) {
    try {
      await this.projectService.createProject(project);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllProjects() {
    try {
      await this.projectService.getAllProjects();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:projectId')
  async getProjectDetail(@Param('projectId') projectId) {
    try {
      await this.projectService.getProjectDetail(projectId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:projectId')
  async editProject(@Param('projectId') projectId, @Body() edit) {
    try {
      await this.projectService.editProject(projectId, edit);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId) {
    try {
      await this.projectService.deleteProject(projectId);
    } catch (error) {
      console.log(error);
    }
  }
}

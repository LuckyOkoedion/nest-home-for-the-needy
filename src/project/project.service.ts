import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly ProjectModel: ReturnModelType<typeof Project>,
  ) { }
  async createProject(project: CreateProjectDto) {
    const createdProject = new this.ProjectModel(project);
    return createdProject.save();
  }

  async getAllProjects() {
    return await this.ProjectModel.find().exec();
  }

  async getProjectDetail(projectId) {
    return await this.ProjectModel.findById(projectId).exec();
  }

  async editProject(projectId, edit) {
    return await this.ProjectModel.updateOne({ _id: projectId }, edit).exec();
  }

  async deleteProject(projectId) {
    return await this.ProjectModel.deleteOne(projectId).exec();
  }
}

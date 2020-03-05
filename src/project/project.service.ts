import { Injectable} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Model } from 'mongoose';
import { IProject } from './interfaces/project.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly ProjectModel: Model<IProject>,
  ) {}
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
    return await this.ProjectModel.remove(projectId).exec();
  }
}

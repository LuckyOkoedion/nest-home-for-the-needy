import { Injectable, Inject } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Model} from "mongoose";
import { IVisit } from './interfaces/visit.interface';

@Injectable()
export class VisitService {
  constructor(@Inject('VISIT_MODEL') private readonly VisitModel: Model<IVisit>) {}
  async createVisit(visit: CreateVisitDto) {}
  async updateVisit(visitId, edit) {}
  async getAllVisits() {}
}

// Experimental for this project, useful for live stream with mongodb

import { Injectable } from '@nestjs/common';
import { MongoGridFS, IGridFSWriteOption } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
      this.fileModel = new MongoGridFS(this.connection.db, 'images');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return this.fileModel.readFileStream(id);
  }

//   async writeStream(stream, options?: IGridFSWriteOption): Promise<FileInfo> {
//     return await this.fileModel
//       .writeFileStream(stream, options)
//       .then(FilesService.convertToFileInfo);
//   }
//     static convertToFileInfo(convertToFileInfo: any): any {
//         throw new Error("Method not implemented.");
//     }

//   async findInfo(id: Types.ObjectId): Promise<FileInfo> {
//     return await this.fileModel
//       .findById(id.toHexString())
//       .then(FilesService.convertToFileInfo);
//   }

//   public async writeFile(
//     file: DiskFile,
//     metadata?: Metadata,
//   ): Promise<FileInfo> {
//     return await this.fileModel
//       .uploadFile(
//         file.path,
//         {
//           filename: file.originalname,
//           contentType: file.mimetype,
//           metadata,
//         },
//         true,
//       )
//       .then(FilesService.convertToFileInfo);
//   }


 // ...
}

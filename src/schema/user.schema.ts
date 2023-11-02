import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as schema } from 'mongoose';

export type UserDocument = HydratedDocument<Notification>;

@Schema({ collection: 'user', timestamps: true })
export class User {

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  googleId: string

  @Prop()
  photo: string

  @Prop()
  createdAt: schema.Types.Date

  @Prop()
  updatedAt: schema.Types.Date
}


export const UserSchema = SchemaFactory.createForClass(User)
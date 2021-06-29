// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Video, User, Comment } = initSchema(schema);

export {
  Video,
  User,
  Comment
};
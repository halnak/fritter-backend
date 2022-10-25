import {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
type GenericFollow<U> = { //generic follow, will only use on users for first implementation
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: U;
  followers: Array<U>;
  following: Array<U>;
};

export type Follow = GenericFollow<Types.ObjectId>;
export type PopulatedFollow = GenericFollow<User>; 

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowSchema = new Schema<Follow>({
  // The user
  user: {
    // The user for the follow object
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The users this user is following
  followers: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // The users following this user
  following: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }]
});

const FollowModel = model<Follow>('Follow', FollowSchema);
export default FollowModel;

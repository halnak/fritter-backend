import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Circle
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Circle = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string; 
  owner: { type: Types.ObjectId, ref: 'User' }; 
  members: [{ type: Types.ObjectId, ref: 'User' }];
  freets: [{ type: Types.ObjectId, ref: 'Freet' }];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const CircleSchema = new Schema({
  // The name of the circle
  name: { 
    type: String,
    required: true
  },
  // User ID of the owner
  owner: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
    required: true
  },
  // Members of the circle
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: true,
    ref: 'User'
  },
  // Freets posted to this circle
  freets: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Freet' }],
    required: true,
    ref: 'Freet'
  }
});

const CircleModel = model<Circle>('Circle', CircleSchema);
export default CircleModel;

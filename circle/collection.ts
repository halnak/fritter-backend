import type {HydratedDocument, Types} from 'mongoose';
import type {Circle} from './model';
import CircleModel from './model';
import UserModel from '../user/model';

/**
 * This file contains a class with functionality to interact with circle stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Circle> is the output of the CircleModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class CircleCollection {
  /**
   * Add a new Circle
   *
   * @param {string} name - The name of the circle
   * @param {{ type: Types.ObjectId, ref: 'User' }} owner - The username of the owner
   * @return {Promise<HydratedDocument<Circle>>} - The newly created user
   */
  static async addOne(name: string, owner: {type: Types.ObjectId, ref: 'User'}): Promise<HydratedDocument<Circle>> {
    const members = [owner]; // owner is first member of circle
    const freets: Array<{ type: Types.ObjectId, ref: 'Freet' }> = [];
    const circle = new CircleModel({name, owner, members, freets});
    await circle.save(); // Saves user to MongoDB
    return circle;
  }

  /**
   * Find a circle by circleId.
   *
   * @param {string} circleId - The circleId of the circle to find
   * @return {Promise<HydratedDocument<Circle>> | Promise<null>} - The circle with the given circleId, if any
   */
  static async findOneByCircleId(circleId: Types.ObjectId | string): Promise<HydratedDocument<Circle>> {
    return CircleModel.findOne({_id: circleId});
  }

  /**
   * Update members of a circle. 
   *
   * @param {string} circleId - The circleId of the circle to update
   * @param {string} userId - The userId of the user to add or remove from circle members
   * @param {boolean} addUser - Whether to add (true) or remove (false) the user from the circle members
   * @return {Promise<HydratedDocument<Circle>>} - The updated circle
   */
  static async updateOne(circleId: Types.ObjectId, userId: Types.ObjectId | string, addUser: boolean): Promise<HydratedDocument<Circle>> {
    const circle = await CircleModel.findOne({_id: circleId});
    const user = await UserModel.findOne({_id: userId});
    const index = circle.members.indexOf(user.id, 0);
    if (addUser && (index > -1)){
      circle.members.push(user.id)
    }else if (!addUser && (index === -1)){
      circle.members.splice(index, 1);
    }
    await circle.save();
    return circle;
  }

  /**
   * Delete a circle from the collection.
   *
   * @param {string} circleId - The circleId of user to delete
   * @return {Promise<Boolean>} - true if the circle has been deleted, false otherwise
   */
  static async deleteOne(circleId: Types.ObjectId): Promise<boolean> {
    const circle = await CircleModel.deleteOne({_id: circleId});
    return circle !== null;
  }
}

export default CircleCollection;

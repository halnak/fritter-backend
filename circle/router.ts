import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import CircleCollection from './collection';
import * as userValidator from '../user/middleware';
import * as circleValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a circle.
 *
 * @name POST /api/circles
 *
 * @param {string} name - name of circle
 * @param {string} owner - username of creator
 * @return {CircleResponse} - The created circle
 * @throws {403} - If the user is not logged in
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUsername(req.body.owner);
    const circle = await CircleCollection.addOne(req.body.name, user.id);
    res.status(201).json({
      message: `Your circle was created successfully.`,
      user: util.constructCircleResponse(circle)
    });
  }
);

/**
 * Update the membership of a circle.
 *
 * @name PUT /api/circles/:circleId?
 *
 * @param {string} username - The user modifying the circle
 * @param {string} member - The user to add/remove from the circle
 * @param {boolean} addUser - Whether to add or remove the user from the circle
 * @return {CircleResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {403} - If the user is not the owner of the circle
 * @throws {404} - If the Circle ID is invalid (does not exist)
 * @throws {409} - If the member is already a part of the circle
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const circle = await CircleCollection.findOneByCircleId(req.query.circleId as string);
    const member = await UserCollection.findOneByUsername(req.body.member);
    const updated = await CircleCollection.updateOne(circle.id, req.body.member, req.body.addUser);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      user: util.constructCircleResponse(updated)
    });
  }
);

/**
 * Delete a circle.
 *
 * @name DELETE /api/circles
 * @param {string} 
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the circle to delete does not exist
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    await CircleCollection.deleteOne(req.body.id);
    res.status(200).json({
      message: 'Your circle has been deleted successfully.'
    });
  }
);

export {router as circleRouter};

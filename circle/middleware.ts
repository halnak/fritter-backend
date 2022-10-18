import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import CircleCollection from './collection';

/**
 * Checks if the current session user (if any) still exists in the database, for instance,
 * a user may try to post a freet in some browser while the account has been deleted in another or
 * when a user tries to modify an account in some browser while it has been deleted in another
 */
const isCurrentSessionUserExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    const user = await UserCollection.findOneByUserId(req.session.userId);

    if (!user) {
      req.session.userId = undefined;
      res.status(500).json({
        error: {
          userNotFound: 'User session was not recognized.'
        }
      });
      return;
    }
  }

  next();
};

/**
 * Checks if the user is logged in, that is, whether the userId is set in session
 */
const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(403).json({
      error: {
        auth: 'You must be logged in to complete this action.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the user is signed out, that is, userId is undefined in session
 */
const isUserLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    res.status(403).json({
      error: 'You are already signed in.'
    });
    return;
  }

  next();
};

// /**
//  * Checks if a user with userId as author id in req.query exists
//  */
// const isUserOwner = async (req: Request, res: Response, next: NextFunction) => {
//   const circle = await CircleCollection.findOneByCircleId(req.body.id);
//   const user = await UserCollection.findOneByUsername(req.query.author as string);
//   if (!user) {
//     res.status(404).json({
//       error: `A user with username ${req.query.author as string} does not exist.`
//     });
//     return;
//   }

//   next();
// };

export {
  isCurrentSessionUserExists,
  isUserLoggedIn,
  isUserLoggedOut,
};

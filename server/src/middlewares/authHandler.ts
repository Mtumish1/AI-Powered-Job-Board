/**SELF-NOTES:
 * What does authHandler do?
It’s a wrapper function that safely casts the req object in a route to AuthenticatedRequest.

This tells TypeScript: “Hey, req.user is valid here — no need to complain!”
 */

// Import the built-in Express type for route handlers
import { RequestHandler } from 'express';

// Import the AuthenticatedRequest interface from our protect middleware
import { AuthenticatedRequest } from './protect';

/**
 * Define a custom type for route handlers that require authentication.
 * This type extends the base Express RequestHandler but ensures the
 * request object has a `user` property (i.e., the user is authenticated).
 */
type AuthenticatedRouteHandler = RequestHandler<any, any, any, any, any> & (
  (req: AuthenticatedRequest, ...args: any[]) => any
);

/**
 * A helper wrapper function for authenticated routes.
 * It casts the default Express request (`req`) to our custom `AuthenticatedRequest`,
 * allowing us to safely access `req.user` in our route handlers without TypeScript errors.
 *
 * @param handler - the actual route handler function written by the developer
 * @returns a properly typed RequestHandler for Express to use
 */
export const authHandler = (handler: AuthenticatedRouteHandler): RequestHandler => {
  return (req, res, next) => {
    // Type-cast the incoming req object to AuthenticatedRequest
    return handler(req as AuthenticatedRequest, res, next);
  };
};


/**
 * Benefits of using authHandler
Clean route handler code — no need to manually cast or redefine types.

TypeScript now knows req.user is available, so you get auto-complete, type-checking, and error prevention.

Makes it easy to write secure and maintainable routes that depend on the logged-in user.

When should I use it?
Use authHandler(...) for any route handler that depends on a logged-in user (i.e., where you access req.user).

Examples:

Viewing or updating a user profile

Posting or deleting a job (where only admins or recruiters are allowed)

Applying for a job as a logged-in user */
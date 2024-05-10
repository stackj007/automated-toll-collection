import {Request, Response} from "express";

export function isUserLoggedIn(
  req: Request,
  res: Response,
  next: any
) {
  req.user ? next() : res.sendStatus(401)
}

export function isAdmin(req: Request, res: Response, next: any) {
  // @ts-ignore
  req.user?.isAdmin ? next() : res.sendStatus(401)
}

export function isVerified(req: Request, res: Response, next: any) {
  // @ts-ignore
  req.user?.userVehicleRequest.status === "approved" ? next() : res.sendStatus(401)
}

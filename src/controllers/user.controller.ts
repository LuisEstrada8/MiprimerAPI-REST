import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(400).json({ token: createToken(user) });
  }

  return res.status(400).json({
    msg: "The email or password are incorrect"
  });
};

/*
import {Request, Response} from 'express'
import { JsonWebTokenError } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken'
import confing from '../config/config'

function createToken(user: IUser) {
 return jwt.sign({id: user.id, email: user.email}, confing.jwtSecret,{
     expiresIn: 84400,
 }) 
}

export const signUp= async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Please. Send your email and Password'})
    }
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({msg: 'the user already exists'});
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.send('Recived')

    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'Please. Send your email and Password'})
    }

    const user = await User.findOne({email: req.body.email})
    if(!User) {
        return res.status(400).json({msg: 'El Usuario no existe'})
    }

    const isMatch = await user?.comparePassword(req.body.password)
    if(isMatch){
       return res.status(200).json({token: createToken(user)}) 
    }
    return res.status(400).json({
        msg: 'El correo y la constraseña son correctas'
    })
}
*/
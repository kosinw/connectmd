import * as Express from "express";
import * as Redis from "ioredis";
import { Field, ObjectType } from "type-graphql";
import { knexConnection } from "./loaders/database";

export interface LoaderType {
  expressApp: Express.Application;
}

export interface ContextType {
  req: Express.Request & {
    session: {
      userId?: string;
    };
  };
  res: Express.Response;
  redis: Redis.Redis;
  knex: typeof knexConnection;
}

// TODO(kosi): Is this really the best place to put this?
export enum UserRole {
  User = "User",
  Administrator = "Administrator",
}

export enum AuthProviderKind {
  LocalAuthProvider = "LocalAuthProvider",
  OAuthProvider = "OAuthProvider",
}

export enum ProfileKind {
  Student = "StudentProfile",
  Professional = "ProfessionalProfile",
  Other = "OtherProfile",
}

export enum StudentProfileEducation {
  Undergraduate = "Undergraduate",
  Nursing = "Nursing",
  Medical = "Medical",
  Graduate = "Graduate",
  Other = "Other",
}

@ObjectType()
export class FieldError {
  @Field((type) => String)
  field: string;

  @Field((type) => String)
  message: string;
}

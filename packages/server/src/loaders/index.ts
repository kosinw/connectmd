import * as Express from "express";
import { LoaderInterface } from "../types";
import { expressLoader } from "./express";

export const loaders = async ({ expressApp: app }: LoaderInterface) => {
  await expressLoader({ expressApp: app });
  console.log("Express configuration loaded successfully.");
};

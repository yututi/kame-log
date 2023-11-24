import { Endpoints } from "./types";

export const isValidEndpoint = (value: string): value is Endpoints => {
  return [
    "blog"
  ].includes(value);
}

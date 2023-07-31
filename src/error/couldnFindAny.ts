import { MyError } from "@/protocols";
import httpStatus from "http-status";

export function couldntFindAny(str:string): MyError {
    return {
      code: httpStatus.NOT_FOUND,
      content: {
        name: `couldntFindAny${str}`,
        message: `You didn't created any ${str}`,
      }
    }
  }
  
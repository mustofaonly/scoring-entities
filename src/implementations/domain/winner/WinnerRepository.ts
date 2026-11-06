import { ReadRepository, WriteRepository } from "../../../abstractions";
import { WinnerModel } from "../../entities";

export interface WinnerRepository
  extends ReadRepository<WinnerModel, string>, WriteRepository<WinnerModel, string> {}

import { ReadRepository, WriteRepository } from "../../../abstractions";
import { ScoresModel } from "../../entities";

export interface ScoresRepository
  extends
    ReadRepository<ScoresModel, string>,
    WriteRepository<ScoresModel, string> {}

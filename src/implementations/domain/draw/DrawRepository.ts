import { ReadRepository, WriteRepository } from "../../../abstractions";
import { DrawModel } from "../../entities";

export interface DrawRepository
  extends
    ReadRepository<DrawModel, string>,
    WriteRepository<DrawModel, string> {}

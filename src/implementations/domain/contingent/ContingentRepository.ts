import { ReadRepository, WriteRepository } from "../../../abstractions";
import { ContingentModel } from "../../entities";

export interface ContingentRepository
  extends
    ReadRepository<ContingentModel, string>,
    WriteRepository<ContingentModel, string> {}

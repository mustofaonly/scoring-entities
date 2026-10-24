import { ReadRepository, WriteRepository } from "../../../abstractions";
import { UndianModel } from "../../entities";

export interface UndianRepository
  extends
    ReadRepository<UndianModel, string>,
    WriteRepository<UndianModel, string> {}

import { ReadRepository, WriteRepository } from "../../../abstractions";
import { WeightModel } from "../../entities";

export interface WeightRepository
  extends
    ReadRepository<WeightModel, string>,
    WriteRepository<WeightModel, string> {}

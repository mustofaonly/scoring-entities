import { ReadRepository, WriteRepository } from "../../../abstractions";
import { WeightClassModel } from "../../entities";

export interface WeightClassRepository
  extends
    ReadRepository<WeightClassModel, string>,
    WriteRepository<WeightClassModel, string> {}

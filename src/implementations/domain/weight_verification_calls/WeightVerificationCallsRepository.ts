import { ReadRepository, WriteRepository } from "../../../abstractions";
import { WeightVerificationCallsModel } from "../../entities";

export interface WeightVerificationCallsRepository
  extends ReadRepository<WeightVerificationCallsModel, string>, WriteRepository<WeightVerificationCallsModel, string> {}

import { ReadRepository, WriteRepository } from "../../../abstractions";
import { WeightVerificationModel } from "../../entities";

export interface WeightVerificationRepository
  extends ReadRepository<WeightVerificationModel, string>, WriteRepository<WeightVerificationModel, string> {}

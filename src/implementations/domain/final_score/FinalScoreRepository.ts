import type { ReadRepository, WriteRepository } from "../../../abstractions";
import type { FinalScore } from "../../entities";

export interface FinalScoreRepository
  extends ReadRepository<FinalScore, string>, WriteRepository<FinalScore, string> {}

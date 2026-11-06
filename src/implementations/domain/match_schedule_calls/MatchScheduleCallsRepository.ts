import { ReadRepository, WriteRepository } from "../../../abstractions";
import { MatchScheduleCallsModel } from "../../entities";

export interface MatchScheduleCallsRepository
  extends ReadRepository<MatchScheduleCallsModel, string>, WriteRepository<MatchScheduleCallsModel, string> {}

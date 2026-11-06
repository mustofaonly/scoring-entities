import { ReadRepository, WriteRepository } from "../../../abstractions";
import { MatchScheduleModel } from "../../entities";

export interface MatchScheduleRepository
  extends
    ReadRepository<MatchScheduleModel, string>,
    WriteRepository<MatchScheduleModel, string> {}

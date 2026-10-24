import { ReadRepository, WriteRepository } from "../../../abstractions";
import { LogsModel } from "../../entities";

export interface LogsRepository
  extends
    ReadRepository<LogsModel, string>,
    WriteRepository<LogsModel, string> {}

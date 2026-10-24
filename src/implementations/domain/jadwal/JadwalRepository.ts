import { ReadRepository, WriteRepository } from "../../../abstractions";
import { JadwalModel } from "../../entities";

export interface JadwalReposirory
  extends
    ReadRepository<JadwalModel, string>,
    WriteRepository<JadwalModel, string> {}

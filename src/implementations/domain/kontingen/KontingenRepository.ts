import { ReadRepository, WriteRepository } from "../../../abstractions";
import { KontingenModel } from "../../entities";

export interface KontingenRepository
  extends
    ReadRepository<KontingenModel, string>,
    WriteRepository<KontingenModel, string> {}

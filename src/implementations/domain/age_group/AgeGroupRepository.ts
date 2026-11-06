import { ReadRepository, WriteRepository } from "../../../abstractions";
import { AgeGroupModel } from "../../entities";

export interface AgeGroupRepository
  extends WriteRepository<AgeGroupModel>, ReadRepository<AgeGroupModel> {}

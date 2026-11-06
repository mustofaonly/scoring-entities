import { ReadRepository, WriteRepository } from "../../../abstractions";
import { UserLoginModel } from "../../entities";

export interface UserLoginRepository
  extends
    ReadRepository<UserLoginModel, string>,
    WriteRepository<UserLoginModel, string> {}

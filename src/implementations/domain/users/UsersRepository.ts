import { ReadRepository, WriteRepository } from "../../../abstractions";
import { UsersModel } from "../../entities";

export interface UsersRepository
  extends
    ReadRepository<UsersModel, string>,
    WriteRepository<UsersModel, string> {}

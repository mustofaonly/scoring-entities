import { ReadRepository } from "../../../abstractions";
import { RolesModel } from "../../entities";

export interface RolesRepository extends ReadRepository<RolesModel, string> {}

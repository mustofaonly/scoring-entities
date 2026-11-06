import { ReadRepository, WriteRepository } from "../../../abstractions";
import { CategoryModel } from "../../entities";

export interface CategoryRepository
  extends
    ReadRepository<CategoryModel, string>,
    WriteRepository<CategoryModel, string> {}

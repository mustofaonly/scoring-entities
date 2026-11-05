import { describe, it, expect } from "vitest";
import * as entities from "../src";

describe("scoring-entities package", () => {
  it("exports its public API", () => {
    expect(entities).toBeDefined();
    expect(Object.keys(entities).length).toBeGreaterThan(0);
  });
});

export abstract class Entity<ID> {
  protected constructor(public readonly id: ID) {}

  equals(other?: Entity<ID>): boolean {
    return !!other && this.id === other.id;
  }
}

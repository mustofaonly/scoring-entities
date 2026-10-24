export abstract class ValueObject {
  protected abstract getEqualityComponents(): readonly unknown[];

  equals(other?: ValueObject): boolean {
    if (!other || this.constructor !== other.constructor) {
      return false;
    }

    return (
      JSON.stringify(this.getEqualityComponents()) ===
      JSON.stringify(other.getEqualityComponents())
    );
  }
}

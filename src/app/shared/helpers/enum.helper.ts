export abstract class EnumHelper {
    public static parseKeys(e: { [s: number]: string }): number[] {
        return Object.keys(e)
            .filter(value => isNaN(Number(value)) === false)
            .map(value => Number(value));
    }
}
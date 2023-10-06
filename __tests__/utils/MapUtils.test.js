import { isSolid, getRandomSafeSpot, getKeyString } from '@/utils/coincollector/MapUtils';

describe('isSolid function', () => {
    it('returns true if space is blocked', () => {
        const result = isSolid(7, 4);
        expect(result).toBe(true);
    });

    it('returns true if x is outside the map range', () => {
        const result = isSolid(0, 6);
        expect(result).toBe(true);
    });

    it('returns true if y is outside the map range', () => {
        const result = isSolid(8, 13);
        expect(result).toBe(true);
    });

    it('returns false if space is not blocked and within map range', () => {
        const result = isSolid(3, 7);
        expect(result).toBe(false);
    });
});

describe('getRandomSafeSpot function', () => {
    it('returns an object with x and y properties', () => {
        const result = getRandomSafeSpot();
        expect(result).toHaveProperty('x');
        expect(result).toHaveProperty('y');
    });

    it('returns a valid safe spot', () => {
        const safeSpots = [
            { x: 1, y: 4 },
            { x: 2, y: 4 },
            { x: 1, y: 5 },
            { x: 2, y: 6 },
            { x: 2, y: 8 },
            { x: 2, y: 9 },
            { x: 4, y: 8 },
            { x: 5, y: 5 },
            { x: 5, y: 8 },
            { x: 5, y: 10 },
            { x: 5, y: 11 },
            { x: 11, y: 7 },
            { x: 12, y: 7 },
            { x: 13, y: 7 },
            { x: 13, y: 6 },
            { x: 13, y: 8 },
            { x: 7, y: 6 },
            { x: 7, y: 7 },
            { x: 7, y: 8 },
            { x: 8, y: 8 },
            { x: 10, y: 8 },
            { x: 8, y: 8 },
            { x: 11, y: 4 },
        ];

        const result = getRandomSafeSpot();
        expect(safeSpots).toContainEqual(result);
    });
});

describe('getKeyString function', () => {
    it('returns a string with the x and y values separated by "x"', () => {
        const result = getKeyString(3, 7);
        expect(result).toBe('3x7');
    });
});

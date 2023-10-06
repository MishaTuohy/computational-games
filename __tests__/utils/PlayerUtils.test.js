import { createName, randomFromArray, prefix, animal } from '@/utils/coincollector/PlayerUtils';

describe('createName function', () => {
    it('returns a string that combines a random prefix and animal', () => {
        const result = createName();
        const prefixRegex = new RegExp(`^(${prefix.join('|')})`);
        const animalRegex = new RegExp(`(${animal.join('|')})$`);
        expect(result).toMatch(prefixRegex);
        expect(result).toMatch(animalRegex);
    });

    it('excludes a specified name from the possible results', () => {
        const result = createName('COOLLION');
        expect(result).not.toBe('COOLLION');
    });
});

describe('randomFromArray function', () => {
    it('returns a random item from the input array', () => {
        const result = randomFromArray(['a', 'b', 'c']);
        expect(['a', 'b', 'c']).toContain(result);
    });

    it('excludes a specified item from the possible results', () => {
        const result = randomFromArray(['red', 'green', 'blue'], 'green');
        expect(result).not.toBe('green');
    });
});

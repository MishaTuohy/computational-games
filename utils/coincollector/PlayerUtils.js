export const prefix = [
    'COOL',
    'SUPER',
    'HIP',
    'SMUG',
    'COOL',
    'SILKY',
    'GOOD',
    'SAFE',
    'DEAR',
    'DAMP',
    'WARM',
    'RICH',
    'LONG',
    'DARK',
    'SOFT',
    'BUFF',
    'DOPE',
];
  
export const animal = [
    'BEAR',
    'DOG',
    'CAT',
    'FOX',
    'LAMB',
    'LION',
    'BOAR',
    'GOAT',
    'VOLE',
    'SEAL',
    'PUMA',
    'MULE',
    'BULL',
    'BIRD',
    'BUG',
];

export function createName(exclude = '') {
    let newName;
    do {
        newName = randomFromArray(prefix) + randomFromArray(animal);
    } while (newName === exclude);
    return newName;
}

export const playerColors = ['blue', 'red', 'orange', 'yellow', 'green', 'purple'];

export function randomFromArray(array, exclude='') {
    let selectedItem;
    do {
        selectedItem = array[Math.floor(Math.random() * array.length)];
    } while (selectedItem === exclude);
    return selectedItem;
}

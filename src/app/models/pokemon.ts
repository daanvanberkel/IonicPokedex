interface Ability {
    name: string;
    url: string;
}

interface AbilityItemList {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

interface Form {
    name: string;
    url: string;
}

interface Move {
    name: string;
    url: string;
}

interface MoveItemList {
    move: Move;
}

interface Specie {
    name: string;
    url: string;
}

interface Stat {
    name: string;
    url: string;
}

interface StatItemList {
    base_stat: number;
    effort: number;
    stat: Stat;
}

interface Item {
    name: string;
    url: string;
}

interface ItemItemList {
    item: Item;
}

export class Pokemon {
    id: number;
    name: string;
    abilities: AbilityItemList[];
    base_experience: number;
    forms: Form[];
    moves: MoveItemList[];
    species: Specie[];
    stats: StatItemList[];
    held_items: ItemItemList[];
}

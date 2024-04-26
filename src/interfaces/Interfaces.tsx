export interface Character {
    id: number;
    name: string;
    img: string;
    alias: string[];
    species: string[];
    gender: string;
    age: number;
    height: string;
    relatives: {
        family: string;
        members: string[];
    }[];
    residence: string;
    status: string;
    occupation: string;
    groups: any[];
    roles: string[];
    episodes: string[];
}
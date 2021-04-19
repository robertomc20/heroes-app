
//interface realizada en https://app.quicktype.io/
export interface Heroe {
    id?:               string;
    superhero:         string;
    publisher:         Publisher;
    alter_ego:         string;
    first_appearance:  string;
    characters:        string;
    alt_img?:          string; // https://kjdsad.com/img.png
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}

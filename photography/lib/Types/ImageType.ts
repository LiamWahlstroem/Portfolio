export type ImageResponse = {
    _id: string;
    imageURL: string;
    imageURLSmall: string;
    alt: string;
    location: string;
    date: string;
    imageCollection: string;
};

export type Dimension = {
    width: number | undefined;
    height: number | undefined;
}


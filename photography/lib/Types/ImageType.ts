export type ImageResponse = {
    _id: string;
    imageName: string;
    imageURLFull: string;
    imageURLMedium: string;
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


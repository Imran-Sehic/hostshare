export interface Listing {
    type: string;
    id: string;
    images: ListingImage[];
    details: ListingDetails;
    title: string;
    description: string;
    mainImage: ListingImage;
    capacity: number;
    host?: ListingHost;
    amenities: ListingAmenities;
    location: ListingLocation;
    ratings: ListingRatings;
    reviewCount: number;
    available: boolean;
    pricePerNight: number;
    currency: ListingCurrency;
    sleepingArrangements: ListingSleepingArrangements;
}

export type ListingSleepingArrangements = {
    type: string;
    data: [];
    count: number;
}

export type ListingCurrency = {
    code: string;
    symbol: string;
    name: string;
}

export type ListingRatings = {
    accuracy: number;
    checkin: number;
    cleanliness: number;
    communication: number;
    location: number;
    value: number;
    guestSatisfactionOverall: number;
}

export type ListingLocation = {
    lat: number;
    long: number;
    address: string;
    city: string;
    country: {
        code: string;
        title: string;
    };
    zip: string;
}

export type ListingAmenities = {
    count: number;
    data: {
        group: string;
        available: boolean;
        title: string;
        type: string;
    }[]
}

export type ListingHost = {
    name: string;
    avatar: ListingImage;
    isSuperhost: boolean;
}

export type ListingDetails = {
    count: number;
    data: {
        type: string;
        value: number;
    }[]
}

export enum ListingImageType {
    PHOTO="photo",
    MAIN="main",
    AVATAR="avatar",
}

export type ListingImage = {
    url: string;
    width: number;
    height: number;
    mimeType: string;
    orientation: string;
    type: ListingImageType;
}
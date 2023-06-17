import { Listing } from "./interfaces";

export const formatListings = (data: any): Listing[] => {
    const listings: Listing[] = data.data.map((item: any) => {
        const listing = item.info;
        return {
            type: listing.type,
            id: listing.id,
            images: listing.images.data,
            details: {
                count: listing.details.count,
                data: listing.details.data
            },
            title: listing.title,
            description: listing.description,
            mainImage: listing.mainImage,
            capacity: listing.maxGuestCapacity,
            host: listing?.host || null,
            amenities: {
                count: listing.amenities.count,
                data: listing.amenities.data
            },
            location: listing.location,
            ratings: listing.ratings,
            reviewCount: listing.visibleReviewCount,
            available: listing.available,
            pricePerNight: listing.price,
            currency: listing.currency,
            sleepingArrangements: listing.sleepingArrangements
        }
    })
    return listings
}
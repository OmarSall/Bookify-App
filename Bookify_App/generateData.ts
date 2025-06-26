import {faker} from "@faker-js/faker";
import {writeFileSync} from "fs";

type Venue = {
    id: number;
    location: {
        postalCode: string;
        name: string;
    };
    pricePerNightInEUR: number;
    rating: number;
    capacity: number;
    name: string;
    albumId: number;
    features: string[];
};

type VenueDetails = Venue & {
    venueId: number;
    numberOfReviews: number;
    description: string;
    features: string[];
    sleepingDetails: {
        maxCapacity: number;
        amountOfBeds: number;
    };
    checkInHour: string;
    checkOutHour: string;
    distanceFromCityCenterInKM: number;
    contactDetails: {
        phone: string;
        email: string;
    };
};

const featuresList = [
    // Amenities
    "WiFi", "restaurant", "bar", "pool", "jacuzzi", "garden", "fitness centre",
    "playground", "24h reception", "speakers", "outdoor music", "indoor music", "karaoke", "parking",

    // Room amenities
    "kitchen facilities", "bathroom facilities", "hypoallergenic bedding", "air conditioning",
    "TV", "safe", "pet friendly",

    // Neighbourhood
    "lake", "forest", "mountains", "sea", "national park", "river", "park", "mall", "zoo",
    "church", "old town", "historical monument", "museum", "theatre", "cinema", "amusement park",

    // Handicap accessibility
    "wheelchair friendly", "blind friendly", "deaf friendly", "short-grown friendly",

    // Other
    "fireplace", "library"
];

function generateVenues(count: number): { venues: Venue[]; venuesDetails: VenueDetails[] } {
    const venues: Venue[] = [];
    const venuesDetails: VenueDetails[] = [];

    for (let i = 1; i <= count; i++) {
        const name = faker.word.words({count: 2}); // np. "Enchanted Hut"
        const postalCode = faker.location.zipCode();
        const city = faker.location.city();
        const price = Number(faker.number.float({min: 10, max: 200, fractionDigits: 2}).toFixed(2));
        const rating = Number(faker.number.float({min: 3, max: 5, fractionDigits: 1}).toFixed(1));
        const capacity = faker.number.int({min: 2, max: 10});
        const albumId = faker.number.int({min: 1, max: 500});

        const venue: Venue = {
            id: i,
            location: {
                postalCode,
                name: city,
            },
            pricePerNightInEUR: price,
            rating,
            capacity,
            name,
            albumId,
            features: faker.helpers.arrayElements(featuresList, faker.number.int({min: 3, max: 7})),
        };

        const venueDetails: VenueDetails = {
            ...venue,
            venueId: venue.id,
            numberOfReviews: faker.number.int({min: 10, max: 500}),
            description: faker.lorem.paragraph(),
            features: faker.helpers.arrayElements(featuresList, faker.number.int({min: 5, max: 10})),
            sleepingDetails: {
                maxCapacity: capacity + faker.number.int({min: 2, max: 4}),
                amountOfBeds: faker.number.int({min: 2, max: 6}),
            },
            checkInHour: "12pm",
            checkOutHour: "10am",
            distanceFromCityCenterInKM: faker.number.int({min: 1, max: 15}),
            contactDetails: {
                phone: faker.phone.number(),
                email: faker.internet.email(),
            },
        };

        venues.push(venue);
        venuesDetails.push(venueDetails);
    }

    return {venues, venuesDetails};
}

const data = generateVenues(100);
writeFileSync("db.json", JSON.stringify(data, null, 2));
console.log("✅ Fake data generated and saved to db.json");
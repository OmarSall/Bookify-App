"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {value: true});
var faker_1 = require("@faker-js/faker");
var fs_1 = require("fs");
var featuresList = [
    "kitchen facilities",
    "bathroom facilities",
    "fireplace",
    "hypoallergenic bedding",
    "speakers",
    "TV",
    "WiFi",
    "pet friendly",
    "parking",
    "lake and mountains nearby",
];

function generateVenues(count) {
    var venues = [];
    var venuesDetails = [];
    for (var i = 1; i <= count; i++) {
        var name_1 = faker_1.faker.word.words({count: 2}); // np. "Enchanted Hut"
        var postalCode = faker_1.faker.location.zipCode();
        var city = faker_1.faker.location.city();
        var price = Number(faker_1.faker.number.float({min: 10, max: 200, fractionDigits: 2}).toFixed(2));
        var rating = Number(faker_1.faker.number.float({min: 3, max: 5, fractionDigits: 1}).toFixed(1));
        var capacity = faker_1.faker.number.int({min: 2, max: 10});
        var albumId = faker_1.faker.number.int({min: 1, max: 500});
        var venue = {
            id: i,
            location: {
                postalCode: postalCode,
                name: city,
            },
            pricePerNightInEUR: price,
            rating: rating,
            capacity: capacity,
            name: name_1,
            albumId: albumId,
        };
        var venueDetails = __assign(__assign({}, venue), {
            venueId: venue.id,
            numberOfReviews: faker_1.faker.number.int({min: 10, max: 500}),
            description: faker_1.faker.lorem.paragraph(),
            features: faker_1.faker.helpers.arrayElements(featuresList, faker_1.faker.number.int({min: 5, max: 10})),
            sleepingDetails: {
                maxCapacity: capacity + faker_1.faker.number.int({min: 2, max: 4}),
                amountOfBeds: faker_1.faker.number.int({min: 2, max: 6}),
            },
            checkInHour: "12pm",
            checkOutHour: "10am",
            distanceFromCityCenterInKM: faker_1.faker.number.int({min: 1, max: 15}),
            contactDetails: {
                phone: faker_1.faker.phone.number(),
                email: faker_1.faker.internet.email(),
            }
        });
        venues.push(venue);
        venuesDetails.push(venueDetails);
    }
    return {venues: venues, venuesDetails: venuesDetails};
}

var data = generateVenues(100);
(0, fs_1.writeFileSync)("db.json", JSON.stringify(data, null, 2));
console.log("✅ Fake data generated and saved to db.json");
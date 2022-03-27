export class WashroomApp {
    public listOfWashrooms: any;

    // washroom object = {
    //     title: string,
    //     coordinates: {
    //          longitude: number,
    //          latitude: number
    //     },
    //     reviews: [],
    //     avg_ratings: number
    // };

    // review object: {
    //      rating: number,
    //      comments: string
    // }

    // inputReview object: {
    //      title: string,
    //      rating: number,
    //      comments: string
    // }

    // 1.put: washroom in, void out
    // 2.post: review in, same washroom out
    // 3.post 3-1. button pressed, search matching washroom, return the washroom, shows up the closest 3
    //       3-2. get: return the closest washroom

    constructor() {
        this.listOfWashrooms = [];
    }

    // 1.put: washroom in, void out
    public addWashroom(washroom: object) {
        this.listOfWashrooms.push(washroom);
    }

    public getWashrooms(): [] {
        return this.listOfWashrooms;
    }

    // button pressed, search matching washroom, return the washroom
    public searchWashroom(sentInObj: any): any {
        let washroomInSearch: any;
        for (let washroom in this.getWashrooms()) {
            // @ts-ignore
            if (sentInObj["title"] === washroom["title"]) {
                // @ts-ignore
                washroomInSearch = washroom["title"];
                break;
            }
        }
        return washroomInSearch;
    }

    // getNearestWashroom(currLocation: any):any {
    //     let minDistance = 0;
    //     let closestWashroom: any;
    //
    //     for (let washroom in this.getWashrooms()) {
    //         let distance = this.distanceCalculator(currLocation, washroom);
    //         if (distance < minDistance) {
    //             minDistance = distance;
    //             closestWashroom = washroom;
    //         }
    //     }
    //     return closestWashroom;
    // }

    // takes an inputted coordinates & washroom coordinates, calculate the distance
    public distanceCalculator(currLocation: any, washroom: any): number {
        return ((currLocation["longitude"] - washroom["longitude"])**2
            + (currLocation["latitude"] - washroom["latitude"])**2)**(1/2);
    }

    // 2.post: inputReview object in, same washroom out
    addReview(inputReview: any): any {
        let matchingWashroom = this.searchWashroom(inputReview["title"]);
        let review = {
            rating: inputReview["rating"],
            comments: inputReview["comments"]
        };
        matchingWashroom["reviews"].push(review);
        return matchingWashroom;
    }

    deleteWashrooms(): String {
        this.listOfWashrooms = [];
        return "success";
    }
}
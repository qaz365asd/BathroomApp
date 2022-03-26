export class WashroomApp {
    private listOfWashrooms: any;

    // washroom object = {
    //     title: string,
    //     coordinates: { longitude: number, latitude: number},
    //     reviews: []
    // };

    // review object: {rating: number, comments: string}

    // 1-1. button pressed, search matching washroom, return the washroom, shows up the closest 3
    // 1-2. get: return the closest washroom

    // 2.post: review in, same washroom out
    // 3.put: washroom in, void out

    constructor() {
        this.listOfWashrooms = [];
    }

    public addWashroom(washroom: any) {
        this.listOfWashrooms.push(washroom);
    }

    public getWashrooms(): String {
        return this.listOfWashrooms;
    }

    public addWashroomReview(washroom: any, review: any): any {
        washroom["reviews"].push(review);
    }

    public getWashroomReview(washroom: any): String {
        return washroom["reviews"];
    }

    getNearestWashroom(currLocation: any):any {
        let minDistance = 0;
        let closestWashroom: any;

        for (let washroom in this.getWashrooms()) {
            let distance = this.distanceCalculator(currLocation, washroom);
            if (distance < minDistance) {
                minDistance = distance;
                closestWashroom = washroom;
            }
        }
        return closestWashroom;
    }

    // takes an inputted coordinates & washroom coordinates, calculate the distance
    public distanceCalculator(currLocation: any, washroom: any): number {
        return ((currLocation["longitude"] - washroom["longitude"])**2
            + (currLocation["latitude"] - washroom["latitude"])**2)**(1/2);
    }
}
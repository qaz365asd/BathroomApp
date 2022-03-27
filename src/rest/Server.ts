import express, {Application, Request, Response} from "express";
import * as http from "http";
import cors from "cors";
import {WashroomApp} from "../WashRoomApp";

let washRoomApp: WashroomApp;

export default class Server {
	private readonly port: number;
	private express: Application;
	private server: http.Server | undefined;

	constructor(port: number) {
		console.info(`Server::<init>( ${port} )`);
		this.port = port;
		this.express = express();
		washRoomApp = new WashroomApp();

		this.registerMiddleware();
		this.registerRoutes();

		// NOTE: you can serve static frontend files in from your express server
		// by uncommenting the line below. This makes files in ./frontend/public
		// accessible at http://localhost:<port>/
		this.express.use(express.static("./frontend/public"));
	}

	/**
	 * Starts the server. Returns a promise that resolves if success. Promises are used
	 * here because starting the server takes some time and we want to know when it
	 * is done (and if it worked).
	 *
	 * @returns {Promise<void>}
	 */
	public start(): Promise<void> {
		return new Promise((resolve, reject) => {
			console.info("Server::start() - start");
			if (this.server !== undefined) {
				console.error("Server::start() - server already listening");
				reject();
			} else {
				this.server = this.express.listen(this.port, () => {
					console.info(`Server::start() - server listening on port: ${this.port}`);
					resolve();
				}).on("error", (err: Error) => {
					// catches errors in server start
					console.error(`Server::start() - server ERROR: ${err.message}`);
					reject(err);
				});
			}
		});
	}

	/**
	 * Stops the server. Again returns a promise so we know when the connections have
	 * actually been fully closed and the port has been released.
	 *
	 * @returns {Promise<void>}
	 */
	public stop(): Promise<void> {
		console.info("Server::stop()");
		return new Promise((resolve, reject) => {
			if (this.server === undefined) {
				console.error("Server::stop() - ERROR: server not started");
				reject();
			} else {
				this.server.close(() => {
					console.info("Server::stop() - server closed");
					resolve();
				});
			}
		});
	}

	// Registers middleware to parse request before passing them to request handlers
	private registerMiddleware() {
		// JSON parser must be place before raw parser because of wildcard matching done by raw parser below
		this.express.use(express.json());
		this.express.use(express.raw({type: "application/*", limit: "10mb"}));

		// enable cors in request headers to allow cross-origin HTTP requests
		this.express.use(cors());
	}

	// Registers all request handlers to routes
	private registerRoutes() {
		this.express.get("/echo/:msg", Server.echo);
		// This is an example endpoint this you can invoke by accessing this URL in your browser:
		// http://localhost:4322/echo/hello
		this.express.put("/addWashroom", Server.addWashroom);
		this.express.post("/SearchWashRoom", Server.SearchWashRoom);
		this.express.post("/addReview", Server.addReview);
		this.express.get("/getWashroom", Server.getWashroom);
		this.express.delete("/deleteWashroom", Server.deleteWashroom);
	}
	// ===================================================================
	// 1.put: washroom in, void out
	private static addWashroom(req: Request, res: Response) {
		try {
			console.log("addWashroom");
			const response = Server.performAddWashroom(req.body);
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	private static performAddWashroom(washroom: any) {
		return washRoomApp.addWashroom(washroom);
	}
	// ==========================================================================
	// 3.post 3-1. button pressed, search matching washroom, return the washroom, shows up the closest 3
	//        3-2. get: return the closest washroom
	private static SearchWashRoom(req: Request, res: Response) {
		try {
			console.log("SearchWashRoom");
			const response = Server.performSearchWashRoom(req.body);
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	private static performSearchWashRoom(currWashRoom: any): any {
		return washRoomApp.searchWashroom(currWashRoom);
	}
	// ============================================================================
	// 2.post: inputReview object in, same washroom out
	private static addReview(req: Request, res: Response) {
		try {
			console.log("addReview....");
			const response = Server.performAddReview(req.body);
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	private static performAddReview(inputReview: any): any {
		return washRoomApp.addReview(inputReview);
	}
	// ==========================================================================
	// 4. get: get the list of washrooms
	private static getWashroom(req: Request, res: Response) {
		try {
			console.log("getWashroom");
			const response = Server.performGetWashroom();
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	private static performGetWashroom(): [] {
		return washRoomApp.getWashrooms();
	}
	// ==========================================================================
	private static deleteWashroom(req: Request, res: Response) {
		try {
			console.log("deleteWashroom");
			const response = Server.performDeleteWashroom();
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	private static performDeleteWashroom():String {
		return washRoomApp.deleteWashrooms();
	}

	// ==========================================================================================

	// The next two methods handle the echo service.
	// These are almost certainly not the best place to put these, but are here for your reference.
	// By updating the Server.echo function pointer above, these methods can be easily moved.
	private static echo(req: Request, res: Response) {
		try {
			console.log(`Server::echo(..) - params: ${JSON.stringify(req.params)}`);
			const response = Server.performEcho(req.params.msg);
			res.status(200).json({result: response});
		} catch (err) {
			res.status(400).json({error: err});
		}
	}

	// almost equivalent to calling addDataset
	private static performEcho(msg: string): string {
		if (typeof msg !== "undefined" && msg !== null) {
			return `${msg}...${msg}`;
		} else {
			return "Message not provided";
		}
	}
}

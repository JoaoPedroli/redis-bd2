import redis, { ErrorReply } from "redis";
const client = redis.createClient();

async function connect() {
	client.connect();
	client.on("error", (error: ErrorReply) => {
		console.log("Error: ", error);
	});
	console.log("=-=-=-= Redis Connected. =-=-=-=");
}

connect();

export default client;

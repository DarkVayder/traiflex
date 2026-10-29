// Starts the local MongoDB that MONGODB_URI points at (My List). Safe to run repeatedly.
import { execFileSync } from "node:child_process";

const NAME = "traiflex-mongo";
const docker = (...args) => execFileSync("docker", args, { encoding: "utf8" }).trim();

let running = null;
try {
  running = docker("inspect", "-f", "{{.State.Running}}", NAME);
} catch {
  // No such container yet.
}

if (running === "true") {
  console.log(`${NAME} is already running on 127.0.0.1:27017`);
} else if (running === "false") {
  docker("start", NAME);
  console.log(`started ${NAME} on 127.0.0.1:27017`);
} else {
  docker(
    "run", "-d", "--name", NAME,
    "-p", "27017:27017",
    "-v", "traiflex-mongo-data:/data/db",
    "--restart", "unless-stopped",
    "mongo:7",
  );
  console.log(`created and started ${NAME} on 127.0.0.1:27017`);
}

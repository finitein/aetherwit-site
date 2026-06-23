import { getLogs } from "@/lib/tina";
import { LogsClient } from "./LogsClient";

export default async function Logs() {
  const logs = await getLogs();

  return <LogsClient logs={logs} />;
}

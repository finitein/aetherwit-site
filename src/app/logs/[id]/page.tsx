import { getLogById } from "@/lib/tina";
import { LogDetailClient } from "./LogDetailClient";

interface LogDetailProps {
  params: Promise<{ id: string }>;
}

export default async function LogDetail({ params }: LogDetailProps) {
  const { id } = await params;
  const log = await getLogById(id);

  return <LogDetailClient log={log} />;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vm/")({
  component: VMIndex,
});

function VMIndex() {
  return <>HI</>;
}

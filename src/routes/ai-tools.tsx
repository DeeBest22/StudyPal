import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ai-tools')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ai-tools"!</div>
}

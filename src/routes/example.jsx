import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/example')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/example"!</div>
}

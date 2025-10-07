// Minimal placeholder for a route that doesn't have real content yet.
// Each page file that renders this is a genuine route target already
// wired into the router — the real content replaces just that file's
// body when its own issue comes up. This shared shell only exists so
// the 12 stub pages don't each duplicate the same markup/CSS.
export default function PageStub({ title }) {
  return (
    <div className="page-stub">
      <h1>{title}</h1>
      <p>This section is under construction.</p>
    </div>
  )
}

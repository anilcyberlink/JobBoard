// app/backend/layout.js
export default function BackendLayout({ children }) {
  return (
    <div>
      <h2>Backend Section</h2>
      {/* Add any backend-specific UI here */}
      {children}
    </div>
  );
}

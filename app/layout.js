// app/layout.js
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Job Board</h1>
          {/* Add your navigation links */}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

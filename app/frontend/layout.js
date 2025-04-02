// app/frontend/layout.js
export default function FrontendLayout({ children }) {
    return (
      <div>
        <h2>Frontend Section</h2>
        {/* Any additional UI specific to frontend */}
        {children}
      </div>
    );
  }
  
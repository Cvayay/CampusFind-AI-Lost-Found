import ReportForm from './ReportForm.jsx';

export default function ReportFound() {
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#fcfcfc", // Matches the "cool" minimalist vibe
    paddingTop: "40px",
    paddingBottom: "80px"
  };

  return (
    <div style={pageStyle}>
      {/* You can add a 'Found' specific header here if you want */}
      <ReportForm type="found" />
    </div>
  );
}
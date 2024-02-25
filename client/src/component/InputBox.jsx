export default function InputBox({ label, placeholder, onChange, type, error }) {
  const borderColor = error ? "border-red-500" : "border-slate-200";

  return (
    <>
      <div className="text-sm font-medium py-2 text-left">{label}</div>
      <input
        type={type}
        onChange={onChange}
        className={`w-full px-2 py-1 border rounded ${borderColor}`}
        placeholder={placeholder}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
}
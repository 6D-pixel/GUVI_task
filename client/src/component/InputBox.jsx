export default function InputBox({ label, placeholder, onChange , type}) {
  return (
    <>
      <div className="text-sm font-medium py-2 text-left">{label}</div>
      <input
        type={type}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"
        placeholder={placeholder}
      />
    </>
  );
}

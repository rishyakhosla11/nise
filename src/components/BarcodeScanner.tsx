const BarcodeScanner = ({ onResult, onClose }: { onResult: (code: string) => void; onClose: () => void }) => {
  return (
    <div className="p-6 border rounded bg-muted">
      <p className="text-sm mb-4">Scanner coming soon!</p>
      <button onClick={() => onResult("123456789")} className="px-3 py-2 bg-blue-500 text-white rounded mr-2">
        Fake Scan
      </button>
      <button onClick={onClose} className="px-3 py-2 bg-gray-300 text-black rounded">
        Close
      </button>
    </div>
  );
};

export default BarcodeScanner;

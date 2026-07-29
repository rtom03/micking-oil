// components/DistributorModal.tsx

type DistributorModalProps = {
  open: boolean;
  loading?: boolean;
  distributor: {
    name?: string;
    location: string;
    phone: string;
  } | null;
  distance?: number;
  onClose: () => void;
  onContinue: () => void;
};

export default function DistributorModal({
  open,
  distributor,
  distance,
  onClose,
  onContinue,
}: DistributorModalProps) {
  if (!open || !distributor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex justify-center text-5xl">📍</div>

        <h2 className="mt-4 text-center text-2xl font-bold text-[#14120F]">
          Distributor Found
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          We've found the nearest authorized distributor for your location.
        </p>

        <div className="mt-7 rounded-xl bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Distributor Location
          </p>

          <p className="mt-1 text-lg font-semibold">{distributor.location}</p>

          {distance !== undefined && (
            <p className="mt-3 text-sm text-gray-500">
              Approximately{" "}
              <span className="font-semibold text-black">{distance} km</span>{" "}
              from your location.
            </p>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border py-3 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="flex-1 rounded-lg bg-[#D6241C] py-3 font-semibold text-white transition hover:bg-[#b91e17]"
          >
            Continue To whatsApp →
          </button>
        </div>
      </div>
    </div>
  );
}

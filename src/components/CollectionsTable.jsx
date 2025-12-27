import { useGetCollectionSummaryQuery } from "@/redux/features/collection/collectionApi";
import { useParams } from "react-router-dom";

const CollectionsTable = () => {
  const { id } = useParams();
  const {
    data: collectionSummary,
    isLoading,
    isError,
  } = useGetCollectionSummaryQuery(id || "");
  const rows = [
    {
      entity: "PRINCIPAL",
      total: Number(collectionSummary?.data?.total_principal || 0),
      bank: Number(collectionSummary?.data?.bank_principal || 0),
      nbfc: Number(collectionSummary?.data?.nbfc_principal || 0),
    },
    {
      entity: "INTEREST",
      total: Number(collectionSummary?.data?.total_interest || 0),
      bank: Number(collectionSummary?.data?.bank_interest || 0),
      nbfc: Number(collectionSummary?.data?.nbfc_interest || 0),
    },
  ];

  // 👉 Calculate SUM dynamically
  const sumRow = rows.reduce(
    (acc, row) => ({
      entity: "SUM",
      total: acc.total + row.total,
      bank: acc.bank + row.bank,
      nbfc: acc.nbfc + row.nbfc,
    }),
    { total: 0, bank: 0, nbfc: 0 }
  );

  const data = [...rows, sumRow];

  return (
    <div className="bg-white p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
          <path d="M9 3v18M3 9h6M3 15h6" strokeWidth="2" />
        </svg>
        <h2 className="font-semibold text-gray-900">Collection Information</h2>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-600">
            <th className="px-4 py-2 text-left font-medium">*</th>
            <th className="px-4 py-2 text-center font-medium">TOTAL</th>
            <th className="px-4 py-2 text-center font-medium">BANK</th>
            <th className="px-4 py-2 text-center font-medium">NBFC</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`border-t ${
                row.entity === "SUM"
                  ? "bg-indigo-50 font-semibold text-indigo-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="px-4 py-2">{row.entity}</td>
              <td className="px-4 py-2 text-center">{row.total}</td>
              <td className="px-4 py-2 text-center">{row.bank}</td>
              <td className="px-4 py-2 text-center">{row.nbfc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionsTable;

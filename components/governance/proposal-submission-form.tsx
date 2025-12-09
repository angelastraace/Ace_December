export default function ProposalSubmissionForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit a Proposal</h2>
      <form className="space-y-4">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          type="text"
          placeholder="Proposal Title"
        />
        <textarea
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Proposal Description"
          rows={4}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
      </form>
    </div>
  )
}

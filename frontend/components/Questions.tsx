import React, { useState } from "react";

const CHALLENGE_TYPES = [
  "HYBRID",
  "SPREADSHEET",
  "VIDEO_RESPONSE",
  "PERSONALITY",
  "FILE_UPLOAD",
  "TEXT",
  "THEORY",
  "DESIGN",
  "PROJECT",
] as const;

const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export default function AddCodingQuestionForm() {
  const [form, setForm] = useState<any>({
    title: "",
    type: "HYBRID",
    difficulty: "Easy",
    category: "",
    description: "",
    initialCode: "",
    testCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Question:", form);
    // TODO: API call here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Coding Question</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium">Challenge Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            {CHALLENGE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          />
        </div>

        {/* Conditional: Coding */}
        {form.type === "HYBRID" && (
          <>
            <div>
              <label className="block text-sm font-medium">Initial Code</label>
              <textarea
                name="initialCode"
                value={form.initialCode}
                onChange={handleChange}
                rows={5}
                className="w-full mt-1 p-2 border rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Test Code</label>
              <textarea
                name="testCode"
                value={form.testCode}
                onChange={handleChange}
                rows={5}
                className="w-full mt-1 p-2 border rounded-lg font-mono"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
          >
            Save Question
          </button>
        </div>
      </form>
    </div>
  );
}

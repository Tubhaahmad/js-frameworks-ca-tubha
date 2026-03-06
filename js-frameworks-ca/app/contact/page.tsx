"use client";

import { useState } from "react";

type ContactFormData = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

function validate(values: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  const emailOk = /^\S+@\S+\.\S+$/.test(values.email.trim());
  if (!emailOk) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1) Validate
    const nextErrors = validate(values);
    setErrors(nextErrors);

    // 2) Stop if there are validation errors
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // 3) Send message
    try {
      setStatus("submitting");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues({ fullName: "", subject: "", email: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-black">Contact</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Send us a message (all fields are required).
        </p>
        {status === "success" && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm">
            Message sent successfully.
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm">
            Something went wrong. Please try again.
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Full Name
            </label>
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white p-2 text-gray-500"
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Subject</label>
            <input
              name="subject"
              value={values.subject}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white p-2 text-gray-500"
              placeholder="What is this about?"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white p-2 text-gray-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Message</label>
            <input
              name="message"
              value={values.message}
              onChange={handleChange}
              className="mt-1 w-full rounded border bg-white p-2 text-gray-500"
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded bg-black px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {" "}
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </main>
  );
}

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
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-black">
            Contact
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">
            Send us a message
          </p>
        </div>

        {status === "success" && (
          <div className="mb-6 border border-gray-900 px-4 py-3 text-xs uppercase tracking-widest text-gray-900 text-center">
            Message sent successfully
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 border border-red-300 px-4 py-3 text-xs uppercase tracking-widest text-red-500 text-center">
            Something went wrong. Please try again.
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Full Name
            </label>
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="mt-2 w-full border-b border-gray-200 bg-transparent py-2 text-xs tracking-wide text-gray-900 placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200"
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Subject
            </label>
            <input
              name="subject"
              value={values.subject}
              onChange={handleChange}
              className="mt-2 w-full border-b border-gray-200 bg-transparent py-2 text-xs tracking-wide text-gray-900 placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200"
              placeholder="What is this about?"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Email
            </label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-2 w-full border-b border-gray-200 bg-transparent py-2 text-xs tracking-wide text-gray-900 placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Message
            </label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full border-b border-gray-200 bg-transparent py-2 text-xs tracking-wide text-gray-900 placeholder:text-gray-300 outline-none focus:border-black transition-colors duration-200 resize-none"
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-black py-3 text-xs font-medium tracking-widest uppercase text-white hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}

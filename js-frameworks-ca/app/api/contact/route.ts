export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    subject?: string;
    email?: string;
    message?: string;
  };

  if (!body.fullName || !body.subject || !body.email || !body.message) {
    return Response.json(
      { ok: false, message: "Missing fields" },
      { status: 400 },
    );
  }

  return Response.json({ ok: true });
}

import { describe, it, expect } from "vitest";
import { validateJoin, validateSpeak } from "./validation";

// ---------------------------------------------------------------------------
// validateJoin
// ---------------------------------------------------------------------------

describe("validateJoin", () => {
  const base = { email: "a@b.com", firstName: "", honeypot: "" };

  it("returns null for a minimal valid submission", () => {
    expect(validateJoin(base)).toBeNull();
  });

  it("returns null with an optional first name", () => {
    expect(validateJoin({ ...base, firstName: "Alex" })).toBeNull();
  });

  it("requires email", () => {
    const errors = validateJoin({ ...base, email: "" });
    expect(errors).not.toBeNull();
    expect(errors?.email).toMatch(/required/i);
  });

  it("rejects a malformed email", () => {
    const errors = validateJoin({ ...base, email: "notanemail" });
    expect(errors).not.toBeNull();
    expect(errors?.email).toMatch(/valid/i);
  });

  it("rejects an email with no TLD", () => {
    const errors = validateJoin({ ...base, email: "a@b" });
    expect(errors?.email).toMatch(/valid/i);
  });

  it("accepts a first name at the length limit and rejects one over it", () => {
    expect(validateJoin({ ...base, firstName: "a".repeat(100) })).toBeNull();
    const errors = validateJoin({ ...base, firstName: "a".repeat(101) });
    expect(errors?.firstName).toMatch(/100/);
  });
});

// ---------------------------------------------------------------------------
// validateSpeak
// ---------------------------------------------------------------------------

describe("validateSpeak", () => {
  const base = {
    name: "Taylor Kim",
    email: "t@example.com",
    talkTitle: "Building RAG pipelines",
    talkFormat: "short_demo",
    description: "A five-minute live demo of a retrieval-augmented chatbot.",
    honeypot: "",
  };

  it("returns null for a fully valid submission", () => {
    expect(validateSpeak(base)).toBeNull();
  });

  it("requires name", () => {
    const errors = validateSpeak({ ...base, name: "" });
    expect(errors?.name).toMatch(/required/i);
  });

  it("rejects a name longer than 100 chars", () => {
    const errors = validateSpeak({ ...base, name: "A".repeat(101) });
    expect(errors?.name).toMatch(/100/);
  });

  it("requires email", () => {
    const errors = validateSpeak({ ...base, email: "" });
    expect(errors?.email).toMatch(/required/i);
  });

  it("rejects a malformed email", () => {
    const errors = validateSpeak({ ...base, email: "bad@" });
    expect(errors?.email).toMatch(/valid/i);
  });

  it("requires talkTitle", () => {
    const errors = validateSpeak({ ...base, talkTitle: "" });
    expect(errors?.talkTitle).toMatch(/required/i);
  });

  it("rejects a talkTitle over 200 chars", () => {
    const errors = validateSpeak({ ...base, talkTitle: "T".repeat(201) });
    expect(errors?.talkTitle).toMatch(/200/);
  });

  it("requires talkFormat", () => {
    const errors = validateSpeak({ ...base, talkFormat: "" });
    expect(errors?.talkFormat).toMatch(/select/i);
  });

  it("rejects an invalid talkFormat", () => {
    const errors = validateSpeak({ ...base, talkFormat: "keynote" });
    expect(errors?.talkFormat).toBeDefined();
  });

  it("accepts both valid talkFormat values", () => {
    expect(validateSpeak({ ...base, talkFormat: "short_demo" })).toBeNull();
    expect(validateSpeak({ ...base, talkFormat: "deep_dive" })).toBeNull();
  });

  it("requires description", () => {
    const errors = validateSpeak({ ...base, description: "" });
    expect(errors?.description).toMatch(/required/i);
  });

  it("rejects a description over 2000 chars", () => {
    const errors = validateSpeak({ ...base, description: "D".repeat(2001) });
    expect(errors?.description).toMatch(/2000/);
  });

  it("collects multiple errors at once", () => {
    const errors = validateSpeak({
      ...base,
      name: "",
      email: "",
      talkTitle: "",
    });
    expect(errors).not.toBeNull();
    expect(Object.keys(errors!).length).toBeGreaterThanOrEqual(3);
  });
});

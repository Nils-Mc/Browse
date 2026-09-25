import test from "node:test";
import assert from "node:assert/strict";
import { allowedOrigins } from "../src/worker.js";

test("uses the documented default", () => {
  assert.deepEqual(allowedOrigins(), ["https://developers.cloudflare.com"]);
});

test("normalizes, deduplicates, and trims configured origins", () => {
  assert.deepEqual(
    allowedOrigins(" https://example.com/path,https://example.com,https://docs.example.org "),
    ["https://example.com", "https://docs.example.org"],
  );
});

test("excludes malformed and non-HTTPS configured values", () => {
  assert.deepEqual(
    allowedOrigins("not a url,http://example.com,https://safe.example"),
    ["https://safe.example"],
  );
});

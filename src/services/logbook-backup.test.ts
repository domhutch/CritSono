import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { parseBackup } from "../domain/backup";
import { addTimestamps, createDraft } from "../domain/logbook";
import { saveCase, savePathwayMode } from "../storage/logbook-store";
import { createUnencryptedLogbookBackup } from "./logbook-backup";

describe("unencrypted logbook backup", () => {
  it("creates a readable backup with cases and training modes", async () => {
    const entry = addTimestamps(createDraft("lung"));
    await saveCase(entry);
    await savePathwayMode("lung", true);

    const backup = await createUnencryptedLogbookBackup({
      lung: true,
      heart: false,
      abdomen: false,
      dvt: false,
      hd: false,
      vascular: false,
    });

    expect(backup.caseCount).toBe(1);
    const parsed = parseBackup(backup.payload);
    expect(parsed.cases.map((item) => item.id)).toEqual([entry.id]);
    expect(parsed.pathwayModes.lung).toBe(true);
    expect(JSON.parse(backup.payload)).not.toHaveProperty("ciphertext");
  });
});

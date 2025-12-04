import crypto from "crypto";
import { env } from "../config/env.js";

const ALGO = "aes-256-gcm";
const KEY = crypto.scryptSync(env.encryptionKey, "salt", 32);

export function encryptToString(value) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGO, KEY, iv);
    const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptFromString(encString) {
    try {
        if (!encString || typeof encString !== "string") return null;
        if (!encString.includes(":")) return null;

        const parts = encString.split(":");
        if (parts.length !== 3) return null;

        const [ivHex, tagHex, contentHex] = parts;

        if (!ivHex || !tagHex || !contentHex) return null;

        const iv = Buffer.from(ivHex, "hex");
        const tag = Buffer.from(tagHex, "hex");
        const encrypted = Buffer.from(contentHex, "hex");

        const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        return decrypted.toString("utf8");
    } catch (err) {
        console.error("❌ decrypt error:", err.message);
        return null; // never crash controller
    }
}

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Disk storage (recommended)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + ext);
    },
});

// File filter (optional)
function fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Invalid file type. Only JPG, PNG, WEBP allowed."));
    }
    cb(null, true);
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
        files: 10,
    },
    fileFilter,
});

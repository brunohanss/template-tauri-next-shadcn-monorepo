// src/index.ts
import { z } from "zod";
var DbTypeSchema = z.enum(["sqlite", "postgres", "mongo"]);
var RunProjectSchema = z.object({
  projectPath: z.string().min(1),
  dbType: DbTypeSchema
});
export {
  DbTypeSchema,
  RunProjectSchema
};
//# sourceMappingURL=index.js.map
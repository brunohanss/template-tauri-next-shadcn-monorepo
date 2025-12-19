import { z } from "zod";

export const DbTypeSchema = z.enum(["sqlite", "postgres", "mongo"]);
export type DbType = z.infer<typeof DbTypeSchema>;

export const RunProjectSchema = z.object({
  projectPath: z.string().min(1),
  dbType: DbTypeSchema
});
export type RunProject = z.infer<typeof RunProjectSchema>;

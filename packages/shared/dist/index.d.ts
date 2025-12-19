import { z } from 'zod';

declare const DbTypeSchema: z.ZodEnum<["sqlite", "postgres", "mongo"]>;
type DbType = z.infer<typeof DbTypeSchema>;
declare const RunProjectSchema: z.ZodObject<{
    projectPath: z.ZodString;
    dbType: z.ZodEnum<["sqlite", "postgres", "mongo"]>;
}, "strip", z.ZodTypeAny, {
    projectPath: string;
    dbType: "sqlite" | "postgres" | "mongo";
}, {
    projectPath: string;
    dbType: "sqlite" | "postgres" | "mongo";
}>;
type RunProject = z.infer<typeof RunProjectSchema>;

export { type DbType, DbTypeSchema, type RunProject, RunProjectSchema };

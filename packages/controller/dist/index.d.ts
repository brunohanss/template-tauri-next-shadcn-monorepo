import * as execa from 'execa';

declare function ensureDockerInstalled(): Promise<{
    ok: boolean;
    message: string;
}>;
declare function writeCompose(input: unknown): Promise<{
    runtimeDir: string;
}>;
declare function up(runtimeDir: string): Promise<execa.Result<{
    cwd: string;
}>>;
declare function down(runtimeDir: string): Promise<execa.Result<{
    cwd: string;
}>>;
declare function logsProcess(runtimeDir: string): execa.ResultPromise<{
    cwd: string;
}>;

export { down, ensureDockerInstalled, logsProcess, up, writeCompose };

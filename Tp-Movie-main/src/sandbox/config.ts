type Env = "dev" | "prod";
type LogLevel = "debug" | "info" | "warn" | "error";
type AppConfig = {
  env: Env,
  logLevel: LogLevel,
  feature: "newCheckout" | "betaBanner"
}

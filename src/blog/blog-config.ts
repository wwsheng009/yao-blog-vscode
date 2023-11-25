import * as vscode from "vscode";
import { ExtensionContext, SecretStorage } from "vscode";

export let AppKey: string = "cnblogWriteVsCode";

export class BlogConfig {
  private static _instance: BlogConfig;

  constructor(private secretStorage: SecretStorage) {}
  static init(context: ExtensionContext): void {
    /*
    Create instance of new AuthSettings.
    */
    BlogConfig._instance = new BlogConfig(context.secrets);
  }
  static get instance(): BlogConfig {
    /*
    Getter of our AuthSettings existing instance.
    */
    return BlogConfig._instance;
  }
  /**
   * 获取根配置
   */
  private get config(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("writeCnblog");
  }

  get blogId(): string | undefined {
    return this.config.get<string>("blogId");
  }

  async setBlogId(value: string) {
    await this.config.update("blogId", value, true);
  }

  userName(): string | undefined {
    return this.config.get<string>("userName");
  }

  async setUserName(value: string) {
    await this.config.update("userName", value, true);
  }

  async password(): Promise<string> {
    let rpcUrl = this.rpcUrl() || "";
    let userName = this.userName() || "";
    return (await this.secretStorage.get(rpcUrl + userName)) || "";
  }

  async setPassword(value: string | undefined) {
    let rpcUrl = this.rpcUrl() || "";
    let userName = this.userName() || "";
    this.secretStorage.store(rpcUrl + userName, value || "");
    return "";
  }

  rpcUrl(): string | undefined {
    return this.config.get<string>("rpcUrl");
  }

  async setRpcUrl(value: string) {
    await this.config.update("rpcUrl", value, true);
  }

  blogWorkspace(): string | undefined {
    return this.config.get<string>("blogWorkspace");
  }

  async setBlogWorkspace(value: string) {
    await this.config.update("blogWorkspace", value, true);
  }

  recentPostCount(): number | undefined {
    return this.config.get<number>("recentPostCount");
  }

  async setrecentPostCount(value: number) {
    await this.config.update("recentPostCount", value, true);
  }
}

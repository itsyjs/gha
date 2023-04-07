export declare const context: Context;
interface GetInputOpts { required?: boolean; }
export declare function getInput(name: string, options: GetInputOpts): string;
export declare function getMultilineInput(name: string, options: GetInputOpts): string[];
export declare function getBooleanInput(name: string, options: GetInputOpts): boolean;
export declare function info(message: string): void;
export declare function debug(message: string): void;
export declare function error(message: string | Error): void;
export declare function warning(message: string | Error): void;
export declare function notice(message: string | Error): void;
export declare function startGroup(name: string | Error): void;
export declare function endGroup(): void;

declare class Context {
  payload: WebhookPayload;

  job: string;
  ref: string;
  sha: string;
  repository: string;
  repositoryOwner: string;
  runId: number;
  runNumber: number;
  runAttempt: number;
  actor: string;
  workflow: string;
  action: string;
  actionPath: string;
  eventName: string;
  refName: string;
  refProtected: boolean;
  refType: string;
  workspace: string;
  temp: string;

  serverUrl: string;
  apiUrl: string;
  graphqlUrl: string;


  constructor();
  get issue(): {
    owner: string;
    repo: string;
    number: number;
  };
  get repo(): {
    owner: string;
    repo: string;
  };
}

interface WebhookPayload {
  [key: string]: any;
  repository?: PayloadRepository;
  issue?: {
    [key: string]: any;
    number: number;
    html_url?: string;
    body?: string;
  };
  commits: PayloadCommit[];
  head_commit: PayloadCommit;
  compare: string;
  pull_request?: {
    [key: string]: any;
    number: number;
    html_url?: string;
    body?: string;
  };
  sender?: {
    [key: string]: any;
    type: string;
  };
  action?: string;
  installation?: {
    id: number;
    [key: string]: any;
  };
  comment?: {
    id: number;
    [key: string]: any;
  };
}
interface PayloadRepository {
  [key: string]: any;
  archived: boolean;
  default_branch: string;
  description: (string | null);
  fork: boolean;
  full_name?: string;
  html_url?: string;
  homepage: (string | null);
  language: string;
  license: (string | null);
  master_branch: string;
  name: string;
  open_issues: number;
  open_issues_count: number;
  owner: {
    [key: string]: any;
    login: string;
    name?: string;
  };
  private: boolean;
  ssh_url?: string;
  url?: string;
  visibility: string;
}
interface PayloadPerson {
  date?: string;
  email: (string | null);
  name: string;
  username?: string;
}
interface PayloadCommit {
  [key: string]: any;
  added?: string[];
  author: PayloadPerson;
  committer: PayloadPerson;
  distinct: boolean;
  id: string;
  message: string;
  modified?: string[];
  removed?: string[];
  timestamp: string;
  tree_id: string;
  url: string;
}

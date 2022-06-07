import type { FormFieldType } from "./types";

export interface IFormField {
  label: string;
  value: string | boolean;
  type: FormFieldType;
  private?: boolean;
  validations: IFormFieldValidator[];
}
export interface IFormFieldValidator {
  message: string;
  test: (value: string | boolean) => boolean;
}

export interface IGitHubData {
  avatar_url: string;
  created_at: string;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: string;
  url: string;
}

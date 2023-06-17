export interface AuthorizationData {
  audience: string,
  permission: {
    id: string,
    scopes?: string[]
  }
}

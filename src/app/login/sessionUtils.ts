
import { User, Session } from "./interface";

export function createSession(user: User, expiresInMs: number): void {
  const sessionId = `session-${Math.random().toString(36).substring(2)}`;
  const expiresAt = Date.now() + expiresInMs;
  const session: Session = { user, sessionId, expiresAt };
  localStorage.setItem("session", JSON.stringify(session));
}

export function getSession(): Session | null {
  const sessionData = localStorage.getItem("session");
  if (!sessionData) return null;
  try {
    const session: Session = JSON.parse(sessionData);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem("session");
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem("session");
}
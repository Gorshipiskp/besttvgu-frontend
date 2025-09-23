export function getJWT(): string | null {
    return localStorage.getItem("jwt");
}

export function setJWT(token: string): void {
    localStorage.setItem("jwt", token);
}

export function removeJWT(): void {
    localStorage.removeItem("jwt");
}

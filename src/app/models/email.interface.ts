export interface Email {
    id?: string;
    from: string;
    to: string;
    htmlContent: string;
    textContent: string;
    subject: string;
}

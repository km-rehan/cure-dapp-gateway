export interface MedicalReportsDto {
    userId: string,
    username: string,
    date: Date,
    reportType: string,
    reportTitle: string,
    reports: string[]
}
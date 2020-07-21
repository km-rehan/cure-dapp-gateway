export interface AppointmentDto {
    userId: string,

    doctorId: string,

    patientname: string,

    mobile: string,

    patientMobile: string,

    email: string,

    patientEmail: string,

    patientLocation: string,

    forTreatment: string,

    timeslot: string,

    datetime: string,

    isPatient: boolean,
}
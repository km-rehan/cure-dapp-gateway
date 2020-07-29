export interface AppointmentDto {
    userId: string,

    doctorId: string,

    //Step 1
    patientname: string,

    //Step2
    mobile: string,

    patientMobile: string,

    email: string,

    patientEmail: string,

    // Step3
    patientLocation: string,

    // Step 4
    forTreatment: string,

    // Step 5
    timeslot: string,

    datetime: string,

    isPatient: boolean,
}
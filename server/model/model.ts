import { Model } from "mongoose"
import { AdminSchema } from "./schema/admin.schema"
import { PatientSchema } from "./schema/patient.schema"
import { OrganisationSchema } from "./schema/organisation.schema"

const Organisation = new Model('Organisation', OrganisationSchema)
const Patient = new Model('Patient', PatientSchema)
const Admin = new Model('Admin', AdminSchema)

export {
    Organisation,
    Patient,
    Admin
}
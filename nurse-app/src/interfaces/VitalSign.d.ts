export interface VitalSign {
    id:string;
    patient:string;
    updatedAt:string;
    temperature:number;
    bloodPressure:number;
    heartRate:number;
    respiratoryRate:number;
    oxygenSaturation:number;
}
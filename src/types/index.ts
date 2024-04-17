import { Machine } from "@prisma/client"

export type TAvatar = {
    avatarURL: string
    avatarURLName: string
}

export type TSocialMedia = {
    smName: string
    smURL: string
}


export type TLocation = {
    lat: number
    long: number
}

export type TUser = {
    userID: string
    userName: string
    userEmail: string
    userPassword: string
    userAvatar: TAvatar
    userSocialMedia: TSocialMedia[]
    userAge: number
    userDesc: string
    userType: string
    userRole: string
    userExp: string
    userCreatedAt: Date
    userUpdatedAt: Date
}



export type TJob = {
    jobID: string;
    jobOwnerID: string
    jobName: string;
    jobType: string;
    jobDate: string;
    jobDesc: string;
    jobMembers: TUser[];
    jobMachinesID: string[];
    jobPriority: string;
    jobFieldID: string
}


export type TMachine = {
    machineID: string
    machineOwnerID: string
    machineName: string
    machineImage: TAvatar
    machineDesc: string
    machineStatus: boolean
    machinePICsID: string[]
}


export type TCrop = {
    cropID: string
    cropOwnerID: string
    cropImage: TAvatar
    cropCA: string
    cropDate: Date
    cropDisease: string
    cropNutrient: string
    cropPrecaution: string

}


export type TField = {
    fieldID: string
    fieldOwnerID: string
    fieldName: string
    fieldCA: string
    fieldSeedDate: string
    fieldST: TSoilTemperature
    fieldSM: TSoilMoisture
    fieldLocation: TLocation[]
}


export type TSoilTemperature = {
    stPrev: number[]
    stTime: number[]
    stCurrent: number
    stLocation: TLocation[]

}


export type TSoilMoisture = {

    smPrev: number[]
    smTime: number[]
    smCurrent: number
    smLocation: TLocation[]

}

export type TForum = {
    forumID: string
    forumContent: string
    forumByID: string
    forumAt: Date
    forumLocation: string
}

export type TTeam = {
    teamID: string
    teamName: string
    teamByID: string
    teamMember: TUser[]
    teamCreatedAt: Date
    teamUpdatedAt: Date
}


















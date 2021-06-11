export declare interface CreatedGroup {
    id: string,
    members: Array<string>,
    leaderIndex: number,
    name: string,
    pickedMember: string
}

export declare interface Group {
    id: string,
    members: Member[],
    name: String
}

export declare interface Member {
    name: String
}

export enum GroupCreationStrategy {
    BY_AMOUNT,
    BY_GROUP_SIZE
}
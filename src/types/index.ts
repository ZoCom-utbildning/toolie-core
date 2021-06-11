export declare interface Group {
    members: Array<string>,
    leaderIndex: number,
    name: string,
    pickedMember: string
}

export enum GroupCreationStrategy {
    BY_AMOUNT,
    BY_GROUP_SIZE
}
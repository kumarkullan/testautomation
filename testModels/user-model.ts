export default class UserModel {
    public UserId: number;
    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Theme: string;
    public CippClientIds: number[];
    public IsSysadmin: boolean;
    public IsIpms: boolean;
    public IsAccessManager: boolean;
    public IsActive: boolean;
    public IsLockedOut: boolean;
    public CippContentGroupIds: number[];
    public PreferredCulture: string;
    public IsInternalUser: boolean;
    public IpManagerClientAssociations: [
        {
            Client: {
                ClientCode: string,
            },
            ContentGroups: Array<{ ContentGroupId: number }>,
            Party?: {
                PartyId: string,
                Code: string,
                PartyDetailId: number,
            },
        }
    ];
}

export default class ContentGroupModel {
    public ContentGroupId: number;
    public ContentGroupName: string;
    public Description: string;
    public Status: number;
    public PermissionsList: Array<
        {
            Id: number,
            ParentCategoryId: number,
        }
        >;
    public CategoryList: number[];
    public SystemResources: number[];
    public UserContentGroupPool?: Array<
        {
            Name: string;
            IsUserSelected: boolean;
            OriginalSelectedValue: boolean;
            IsChanged: boolean;
            ContentGroupId?: number;
        }
        >;
    public ApplicationSecuritySource: Array<{}>;
}

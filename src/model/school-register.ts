export interface ISchoolModel {
    id:           number |null;
    name:         string;
    address:      string;
    status:       number;
    status_label: string;
    created_at:   Date;
    updated_at:   Date;
    user_name:    string;
    email:        string;
}
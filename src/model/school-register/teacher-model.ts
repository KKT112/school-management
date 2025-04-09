export interface ITeacherModel {
    id:         number;
   name:         string;
    email:        string;
    password?:     string;
    created_at?:   Date;
    updated_at?:   Date;
    status?:       number;
    status_label: string;
    school_id:    number;
}
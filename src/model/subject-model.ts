export interface ISubjectModel {
    id:           number;
    name:         string;
    school_id:    number;
    status:       number;
    status_label: string;
    created_at:   string;
    updated_at:   string;
    teacher_id:   number;
    teacher:      Teacher;
}

export interface Teacher {
    id:           number;
    name:         string;
    email:        string;
    password:     string;
    created_at:   string;
    updated_at:   string;
    status:       number;
    status_label: string;
    school_id:    number;
}
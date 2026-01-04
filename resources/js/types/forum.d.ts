export interface Speaker {
    name: string;
    institution: string;
    country: string;
    email: string;
    presentation_title: string;
}

export interface ForumFormData {
    // Step 1
    forum_title: string;
    forum_description: string;

    // Step 2
    organizer_name: string;
    organizer_institution: string;
    organizer_country: string;
    organizer_email: string;

    // Step 3
    co_organizer_name: string;
    co_organizer_institution: string;
    co_organizer_country: string;
    co_organizer_email: string;

    // Step 4
    speakers: Speaker[];

    // Step 5
    submitter_name: string;
    submitter_email: string;

    // 索引签名以兼容 Inertia
    [key: string]: any;
}

export interface ValidationErrors {
    [key: string]: string;
}

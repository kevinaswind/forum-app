<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForumSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Step 1: Forum Information
            'forum_title' => 'required|string|max:255',
            'forum_description' => 'required|string|max:2000',

            // Step 2: Organizer
            'organizer_name' => 'required|string|max:100',
            'organizer_institution' => 'required|string|max:200',
            'organizer_country' => 'required|string|max:100',
            'organizer_email' => 'required|email|max:100',

            // Step 3: Co-organizer
            'co_organizer_name' => 'required|string|max:100',
            'co_organizer_institution' => 'required|string|max:200',
            'co_organizer_country' => 'required|string|max:100',
            'co_organizer_email' => 'required|email|max:100',

            // Step 4: Speakers
            'speakers' => 'required|array|min:4|max:5',
            'speakers.*.name' => 'required|string|max:100',
            'speakers.*.institution' => 'required|string|max:200',
            'speakers.*.country' => 'required|string|max:100',
            'speakers.*.email' => 'required|email|max:100',
            'speakers.*.presentation_title' => 'required|string|max:255',

            // Step 5: Submitter
            'submitter_name' => 'required|string|max:100',
            'submitter_email' => 'required|email|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'forum_title.required' => '论坛题目为必填项',
            'forum_description.required' => '论坛描述为必填项',
            'organizer_email.email' => '请输入有效的电子邮件地址',
            'speakers.min' => '至少需要4位报告人',
            'speakers.max' => '最多只能添加5位报告人',
        ];
    }
}

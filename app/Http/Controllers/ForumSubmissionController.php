<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForumSubmissionRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumSubmissionController extends Controller
{
    public function create()
    {
        return Inertia::render('form-submission/create');
    }

    public function validateStep(Request $request)
    {
        try {
            $step = $request->input('step');
            $rules = $this->getStepRules($step);

            if (empty($rules)) {
                return response()->json([
                    'success' => false,
                    'message' => '无效的步骤'
                ], 400);
            }

            $validated = $request->validate($rules);

            return response()->json([
                'success' => true,
                'data' => $validated
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '验证时发生错误: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(ForumSubmissionRequest $request)
    {
        // 保存完整的表单数据
        $data = $request->validated();

        // 这里处理数据保存逻辑
        // ForumSubmission::create($data);

        return redirect()->route('forum.success')
            ->with('message', '论坛提交成功！');
    }

    private function getStepRules($step)
    {
        $rules = [
            1 => [
                'forum_title' => 'required|string|max:255',
                'forum_description' => 'required|string|max:2000',
            ],
            2 => [
                'organizer_name' => 'required|string|max:100',
                'organizer_institution' => 'required|string|max:200',
                'organizer_country' => 'required|string|max:100',
                'organizer_email' => 'required|email|max:100',
            ],
            3 => [
                'co_organizer_name' => 'required|string|max:100',
                'co_organizer_institution' => 'required|string|max:200',
                'co_organizer_country' => 'required|string|max:100',
                'co_organizer_email' => 'required|email|max:100',
            ],
            4 => [
                'speakers' => 'required|array|min:4|max:5',
                'speakers.*.name' => 'required|string|max:100',
                'speakers.*.institution' => 'required|string|max:200',
                'speakers.*.country' => 'required|string|max:100',
                'speakers.*.email' => 'required|email|max:100',
                'speakers.*.presentation_title' => 'required|string|max:255',
            ],
            5 => [
                'submitter_name' => 'required|string|max:100',
                'submitter_email' => 'required|email|max:100',
            ],
        ];

        return $rules[$step] ?? [];
    }
}

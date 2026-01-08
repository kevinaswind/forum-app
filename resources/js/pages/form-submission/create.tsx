import Step1ForumInfo from '@/pages/form-submission/steps/step-1-forum-info';
import Step2Organizer from '@/pages/form-submission/steps/step-2-organizer';
import Step3CoOrganizer from '@/pages/form-submission/steps/step-3-co-organizer';
import Step4Speakers from '@/pages/form-submission/steps/step-4-speakers';
import Step5Submitter from '@/pages/form-submission/steps/step-5-submitter';
import { ForumFormData, Speaker, ValidationErrors } from '@/types/forum';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const initialSpeaker: Speaker = {
    name: '',
    institution: '',
    country: '',
    email: '',
    presentation_title: '',
};

export default function Create() {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<ForumFormData>({
        forum_title: '',
        forum_description: '',
        organizer_name: '',
        organizer_institution: '',
        organizer_country: '',
        organizer_email: '',
        co_organizer_name: '',
        co_organizer_institution: '',
        co_organizer_country: '',
        co_organizer_email: '',
        speakers: Array(4)
            .fill(null)
            .map(() => ({ ...initialSpeaker })),
        submitter_name: '',
        submitter_email: '',
    });

    const updateFormData = (data: Partial<ForumFormData>) => {
        console.log('Updating form data with:', data);
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const validateStep = async (step: number): Promise<boolean> => {
        setErrors({});

        const stepData = getStepData(step);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            if (!csrfToken) {
                setErrors({ general: 'CSRF token 未找到，请刷新页面' });
                return false;
            }

            const response = await fetch('/forum/validate-step', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ step, ...stepData }),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Expected JSON but got:', text.substring(0, 200));
                setErrors({ general: '服务器返回了意外的响应格式' });
                return false;
            }

            const data = await response.json();

            if (response.status === 422) {
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.message) {
                    setErrors({ general: data.message });
                }
                return false;
            }

            if (!response.ok) {
                setErrors({
                    general: data.message || '服务器错误，请稍后重试',
                });
                return false;
            }

            return true;
        } catch (error) {
            console.error('Validation error:', error);
            setErrors({ general: '验证请求失败，请检查网络连接' });
            return false;
        }
    };

    const getStepData = (step: number) => {
        switch (step) {
            case 1:
                return {
                    forum_title: formData.forum_title,
                    forum_description: formData.forum_description,
                };
            case 2:
                return {
                    organizer_name: formData.organizer_name,
                    organizer_institution: formData.organizer_institution,
                    organizer_country: formData.organizer_country,
                    organizer_email: formData.organizer_email,
                };
            case 3:
                return {
                    co_organizer_name: formData.co_organizer_name,
                    co_organizer_institution: formData.co_organizer_institution,
                    co_organizer_country: formData.co_organizer_country,
                    co_organizer_email: formData.co_organizer_email,
                };
            case 4:
                return {
                    speakers: formData.speakers,
                };
            case 5:
                return {
                    submitter_name: formData.submitter_name,
                    submitter_email: formData.submitter_email,
                };
            default:
                return {};
        }
    };

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handleSubmit = async () => {
        const isValid = await validateStep(5);
        if (isValid) {
            router.post('/forum', formData);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1ForumInfo
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <Step2Organizer
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                    />
                );
            case 3:
                return (
                    <Step3CoOrganizer
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                    />
                );
            case 4:
                return (
                    <Step4Speakers
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                    />
                );
            case 5:
                return (
                    <Step5Submitter
                        formData={formData}
                        updateFormData={updateFormData}
                        errors={errors}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">
                        论坛提交表单
                    </h1>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3, 4, 5].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                                    >
                                        {step}
                                    </div>
                                    {step < 5 && (
                                        <div
                                            className={`mx-2 h-1 w-16 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                            <span>论坛信息</span>
                            <span>组织者</span>
                            <span>联合组织者</span>
                            <span>报告人</span>
                            <span>提交人</span>
                        </div>
                    </div>

                    {/* General Error Message */}
                    {errors.general && (
                        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                            <p className="text-red-600">{errors.general}</p>
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="mb-8">{renderStep()}</div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            上一步
                        </button>

                        {currentStep < 5 ? (
                            <button
                                onClick={handleNext}
                                className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                            >
                                下一步
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                            >
                                提交
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

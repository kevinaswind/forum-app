import { ForumFormData, Speaker, ValidationErrors } from '@/types/forum';

interface Props {
    formData: ForumFormData;
    updateFormData: (data: Partial<ForumFormData>) => void;
    errors: ValidationErrors;
}

const Step4Speakers = ({ formData, updateFormData, errors }: Props) => {
    const updateSpeaker = (
        index: number,
        field: keyof Speaker,
        value: string,
    ) => {
        const newSpeakers = [...formData.speakers];
        newSpeakers[index] = { ...newSpeakers[index], [field]: value };
        updateFormData({ speakers: newSpeakers });
    };

    const addSpeaker = () => {
        if (formData.speakers.length < 5) {
            updateFormData({
                speakers: [
                    ...formData.speakers,
                    {
                        name: '',
                        institution: '',
                        country: '',
                        email: '',
                        presentation_title: '',
                    },
                ],
            });
        }
    };

    const removeSpeaker = (index: number) => {
        if (formData.speakers.length > 4) {
            const newSpeakers = formData.speakers.filter((_, i) => i !== index);
            updateFormData({ speakers: newSpeakers });
        }
    };

    const moveSpeaker = (index: number, direction: 'up' | 'down') => {
        console.log(...formData.speakers);
        const newSpeakers = [...formData.speakers];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newSpeakers.length) {
            [newSpeakers[index], newSpeakers[targetIndex]] = [
                newSpeakers[targetIndex],
                newSpeakers[index],
            ];
            updateFormData({ speakers: newSpeakers });
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">
                    报告人信息
                </h2>
                {formData.speakers.length < 5 && (
                    <button
                        onClick={addSpeaker}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        添加报告人
                    </button>
                )}
            </div>

            {errors.speakers && typeof errors.speakers === 'string' && (
                <p className="mb-4 text-sm text-red-600">{errors.speakers}</p>
            )}

            {formData.speakers.map((speaker, index) => (
                <div
                    key={index}
                    className="space-y-4 rounded-lg border border-gray-200 p-6"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                            报告人 {index + 1}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => moveSpeaker(index, 'up')}
                                disabled={index === 0}
                                className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                上移
                            </button>
                            <button
                                onClick={() => moveSpeaker(index, 'down')}
                                disabled={
                                    index === formData.speakers.length - 1
                                }
                                className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                下移
                            </button>
                            {formData.speakers.length > 4 && (
                                <button
                                    onClick={() => removeSpeaker(index)}
                                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                >
                                    删除
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                姓名 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={speaker.name}
                                onChange={(e) =>
                                    updateSpeaker(index, 'name', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="请输入姓名"
                            />
                            {errors[`speakers.${index}.name`] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[`speakers.${index}.name`]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                单位 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={speaker.institution}
                                onChange={(e) =>
                                    updateSpeaker(
                                        index,
                                        'institution',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="请输入单位"
                            />
                            {errors[`speakers.${index}.institution`] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[`speakers.${index}.institution`]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                国家 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={speaker.country}
                                onChange={(e) =>
                                    updateSpeaker(
                                        index,
                                        'country',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="请输入国家"
                            />
                            {errors[`speakers.${index}.country`] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[`speakers.${index}.country`]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                电子邮件 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={speaker.email}
                                onChange={(e) =>
                                    updateSpeaker(
                                        index,
                                        'email',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="请输入电子邮件"
                            />
                            {errors[`speakers.${index}.email`] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[`speakers.${index}.email`]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            报告题目 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={speaker.presentation_title}
                            onChange={(e) =>
                                updateSpeaker(
                                    index,
                                    'presentation_title',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="请输入报告题目"
                        />
                        {errors[`speakers.${index}.presentation_title`] && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors[`speakers.${index}.presentation_title`]}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Step4Speakers;

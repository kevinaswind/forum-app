import { ForumFormData, ValidationErrors } from '@/types/forum';

interface Props {
    formData: ForumFormData;
    updateFormData: (data: Partial<ForumFormData>) => void;
    errors: ValidationErrors;
}

const Step2Organizer = ({ formData, updateFormData, errors }: Props) => {
    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                组织者信息
            </h2>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    姓名 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.organizer_name}
                    onChange={(e) =>
                        updateFormData({ organizer_name: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入姓名"
                />
                {errors.organizer_name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.organizer_name}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    单位 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.organizer_institution}
                    onChange={(e) =>
                        updateFormData({
                            organizer_institution: e.target.value,
                        })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入单位"
                />
                {errors.organizer_institution && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.organizer_institution}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    国家 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.organizer_country}
                    onChange={(e) =>
                        updateFormData({ organizer_country: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入国家"
                />
                {errors.organizer_country && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.organizer_country}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    电子邮件 <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={formData.organizer_email}
                    onChange={(e) =>
                        updateFormData({ organizer_email: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入电子邮件"
                />
                {errors.organizer_email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.organizer_email}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step2Organizer;

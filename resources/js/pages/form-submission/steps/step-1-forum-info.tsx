import { ForumFormData, ValidationErrors } from '@/types/forum';

interface Props {
    formData: ForumFormData;
    updateFormData: (data: Partial<ForumFormData>) => void;
    errors: ValidationErrors;
}

const Step1ForumInfo = ({ formData, updateFormData, errors }: Props) => {
    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                论坛信息
            </h2>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    论坛题目 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.forum_title}
                    onChange={(e) =>
                        updateFormData({ forum_title: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入论坛题目"
                />
                {errors.forum_title && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.forum_title}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    论坛描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={formData.forum_description}
                    onChange={(e) =>
                        updateFormData({ forum_description: e.target.value })
                    }
                    rows={6}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入论坛描述"
                />
                {errors.forum_description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.forum_description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step1ForumInfo;

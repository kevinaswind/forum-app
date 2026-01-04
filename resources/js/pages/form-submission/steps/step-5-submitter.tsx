import { ForumFormData, ValidationErrors } from '@/types/forum';

interface Props {
    formData: ForumFormData;
    updateFormData: (data: Partial<ForumFormData>) => void;
    errors: ValidationErrors;
}

const Step5Submitter = ({ formData, updateFormData, errors }: Props) => {
    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                提交人信息
            </h2>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    姓名 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.submitter_name}
                    onChange={(e) =>
                        updateFormData({ submitter_name: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入姓名"
                />
                {errors.submitter_name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.submitter_name}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    电子邮件 <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={formData.submitter_email}
                    onChange={(e) =>
                        updateFormData({ submitter_email: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入电子邮件"
                />
                {errors.submitter_email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.submitter_email}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step5Submitter;

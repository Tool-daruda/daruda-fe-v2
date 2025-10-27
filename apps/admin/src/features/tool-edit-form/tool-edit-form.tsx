import { FormProvider, useForm } from "react-hook-form";
import { Form, useLoaderData } from "react-router-dom";

export const ToolEditForm = () => {
	const { toolData } = useLoaderData() as { toolData: Tool };

	const methods = useForm<Tool>({
		defaultValues: toolData,
	});

	return (
		<FormProvider {...methods}>
			<Form method="post"></Form>
		</FormProvider>
	);
};

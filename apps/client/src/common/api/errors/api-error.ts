export class ApiError extends Error {
	status: number;
	body: unknown;

	constructor(message: string, status: number, body: unknown = null) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.body = body;

		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

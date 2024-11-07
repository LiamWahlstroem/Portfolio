export type S3Params = {
	Bucket: string;
	Key: string;
	Body: Buffer;
}

export type S3DeleteParams = {
	Bucket: string;
	Key: string;
}

export interface STSResponse extends Response {
	Credentials: {
		AccessKeyId: string;
		SecretAccessKey: string;
		SessionToken: string,
	}
}
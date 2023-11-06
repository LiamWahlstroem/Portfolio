interface STSResponse extends Response {
	Credentials: {
		AccessKeyId: string;
		SecretAccessKey: string;
		SessionToken: string,
	}
}

export default STSResponse;

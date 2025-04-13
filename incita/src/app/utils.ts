import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (e: unknown) => {
    let errorMessage: string | string[] = "Erro desconhecido. Tente novamente mais tarde.";

	if (e instanceof AxiosError) {
		switch (e.status) {
			case 400:
				errorMessage = e.response!.data.errors.map(
					(responseErrors: string) => responseErrors,
				) as string[];
                
			default:
				errorMessage = e.response!.data.error as string;
		}
	}

    if (Array.isArray(errorMessage)) {
        errorMessage.forEach(error => {
            toast.error(error)
        })
    }
    else {
        toast.error(errorMessage)
    }
};

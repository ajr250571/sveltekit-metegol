export function existeError<T>(data: T): boolean {
	let existeError = false;
	for (const field in data) {
		if (typeof data[field] === 'string') {
			const err = data[field] as string;
			if (err.length > 0) {
				existeError = true;
				break; // Se puede detener el bucle una vez encontrado un campo no vacío
			}
		}
	}
	return existeError;
}

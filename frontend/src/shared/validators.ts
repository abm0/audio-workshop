import { FieldValidator } from "final-form";

export const isRequired: FieldValidator<string> = (value) => value == null ? 'Поле не должно быть пустым' : undefined; 
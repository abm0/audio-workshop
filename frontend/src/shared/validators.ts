import { FieldValidator } from "final-form";

export const isRequired: FieldValidator<string> = (value) => value == null ? 'error__empty_field' : undefined; 